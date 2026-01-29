"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { db } from "@/db/db"
import { appraisal, card } from "@/db/schema"
import { auth } from "@/lib/auth"

import { TradingCard } from "./types"

export const getCards = async (): Promise<TradingCard[]> => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  const cards = await db.query.card.findMany({
    where: eq(card.userId, userId),
    with: {
      appraisals: {
        orderBy: (appraisals, { desc }) => desc(appraisals.appraisalDate)
      }
    },
  })

  const processedCards = cards
    .filter(c => c.appraisals.length > 0)
    .map(c => {
      const latest = c.appraisals[0]

      return {
        ...c,
        lowerBound: latest.lowerBound,
        upperBound: latest.upperBound,
        median: latest.median,
        average: latest.average,
        estimate: latest.estimate,
      }
    })

  return processedCards
}