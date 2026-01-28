"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { db } from "@/db/db"
import { appraisal, card } from "@/db/schema"
import { auth } from "@/lib/auth"
import { getEbayAccessToken } from "@/lib/ebay-auth"

import { Appraisal, TradingCard } from "./types"
import { TradingCardSchema } from "./table/create-new-card-dialog"

export async function addCard(newCard: TradingCardSchema): Promise<TradingCard> {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  if (newCard.name.length < 5) {
    throw new Error(`Card name "${newCard.name}" is invalid. name < 5 characters`)
  }

  const cardAppraisal = await getCardAppraisal(newCard.name)

  const data = await db.transaction(async tx => {
    const cardRes = await tx.insert(card).values({
      id: newCard.id,
      userId: userId,
      name: newCard.name,
      notes: newCard.notes,
      quantity: newCard.quantity
    }).returning({
      createdAt: card.createdAt,
      updatedAt: card.updatedAt
    })

    const appraisalRes = await tx.insert(appraisal).values({
      cardId: newCard.id,
      lowerBound: cardAppraisal.lowerBound.toString(),
      upperBound: cardAppraisal.upperBound.toString(),
      average: cardAppraisal.average.toString(),
      median: cardAppraisal.median.toString(),
      estimate: cardAppraisal.estimate.toString()
    }).returning({
      id: appraisal.id,
      appraisalDate: appraisal.appraisalDate
    })

    return {
      id: newCard.id,
      name: newCard.name,
      notes: newCard.notes,
      quantity: newCard.quantity,
      createdAt: cardRes[0].createdAt,
      updatedAt: cardRes[0].updatedAt,
      lowerBound: cardAppraisal.lowerBound.toString(),
      upperBound: cardAppraisal.upperBound.toString(),
      average: cardAppraisal.average.toString(),
      median: cardAppraisal.median.toString(),
      estimate: cardAppraisal.estimate.toString(),
      appraisalData: [{
        id: appraisalRes[0].id,
        appraisalDate: appraisalRes[0].appraisalDate,
        lowerBound: cardAppraisal.lowerBound.toString(),
        upperBound: cardAppraisal.upperBound.toString(),
        average: cardAppraisal.average.toString(),
        median: cardAppraisal.median.toString(),
        estimate: cardAppraisal.estimate.toString()
      }]
    }
  })

  return data
}

async function getCardAppraisal(cardName: string): Promise<Appraisal> {
  // make the api call
  const accessToken = await getEbayAccessToken()
  
  const baseUrl = process.env.EBAY_API_URL!

  const searchParams = new URLSearchParams({
    q: cardName,
    filter: "priceCurrency:USD"
  })

  const response = await fetch(`${baseUrl}?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
    },
    cache: "no-store", 
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.log(errorText)
    throw new Error(`eBay API returned ${response.status}`)
  }

  const data = await response.json()
  const items = data.itemSummaries || []


  // clean the data
  const cleanedData: number[] = []

  for (const dataPoint of items) {
    const price = Number((dataPoint?.price?.value ?? 0))

    if (price > 0 && dataPoint?.price?.currency === "USD") {
      cleanedData.push(price)
    }
  }

  if (cleanedData.length === 0) {
    return {
      lowerBound: 0,
      median: 0,
      average: 0,
      estimate: 0,
      upperBound: 0,
      confidence: 0
    }
  }

  const sortedData = cleanedData.sort((a, b) => a - b)

  if (sortedData.length <= 20) {
    const min = Math.min(...sortedData)
    const max = Math.max(...sortedData)
    const mid = Math.floor(sortedData.length / 2)
    const median = sortedData.length % 2 === 1 ? sortedData[mid] : (sortedData[mid - 1] + sortedData[mid]) / 2
    const average = sortedData.reduce((acc, dataPoint) => acc + dataPoint, 0) / sortedData.length
    const estimate = median

    return {
      lowerBound: min,
      median: roundTo(median, 2),
      average: roundTo(average, 2),
      estimate: roundTo(estimate, 2),
      upperBound: max,
      confidence: 0
    }
  } else {
    const { q1, q3 } = getQuartiles(sortedData)
    const iqr = q3 - q1

    const lowerFence = q1 - 2 * iqr
    const upperFence = q3 + 1 * iqr

    const trimmedData = sortedData.filter(price => lowerFence <= price && price <= upperFence)

    const min = Math.min(...trimmedData)
    const max = Math.max(...trimmedData)
    const mid = Math.floor(trimmedData.length / 2)
    const median = trimmedData.length % 2 === 1 ? trimmedData[mid] : (trimmedData[mid - 1] + trimmedData[mid]) / 2
    const average = trimmedData.reduce((acc, price) => acc + price, 0) / trimmedData.length
    const estimate = roundTo(
      percentileInterpolated(trimmedData, 0.45),
      2
    )

    return {
      lowerBound: min,
      median: roundTo(median, 2),
      average: roundTo(average, 2),
      estimate: roundTo(estimate, 2),
      upperBound: max,
      confidence: 1
    }
  }
}

function getQuartiles(data: number[]) {
  const mid = Math.floor(data.length / 2)

  const lowerHalf = data.slice(0, mid)
  const upperHalf = data.length % 2 === 1 ? data.slice(mid + 1) : data.slice(mid)

  const lowerMid = Math.floor(lowerHalf.length / 2)
  const q1 = lowerHalf.length % 2 === 1 ? lowerHalf[lowerMid] : (lowerHalf[lowerMid - 1] + lowerHalf[lowerMid]) / 2

  const upperMid = Math.floor(upperHalf.length / 2)
  const q3= upperHalf.length % 2 === 1 ? upperHalf[upperMid] : (upperHalf[upperMid - 1] + upperHalf[upperMid]) / 2

  return { q1, q3 }
}

function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function percentileInterpolated(data: number[], p: number): number {
  const n = data.length
  const pos = p * (n - 1)

  const lower = Math.floor(pos)
  const upper = Math.ceil(pos)

  if (lower === upper) {
    return data[lower]
  }

  const weight = pos - lower
  return data[lower] * (1 - weight) + data[upper] * weight
}