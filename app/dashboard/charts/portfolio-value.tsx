"use client"

import { useMemo } from "react"
import { 
  CircleDollarSign,
  TrendingDown,
  TrendingUp
} from "lucide-react"

import { 
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import { TradingCard } from "../types"

type MonthlyAppraisalData = {
  dateKey: string
  label: string
  lowerBound: number
  upperBound: number
  median: number
  average: number
  estimate: number
}

export function PortfolioValue({
  cards
}: {
  cards: TradingCard[]
}) {
  const portfolioValueData: MonthlyAppraisalData[] = useMemo(() => {
      const acc: Record<string, MonthlyAppraisalData> = {}
  
      for (const card of cards) {
        card.appraisalData.forEach(appraisal => {
          const date = new Date(appraisal.appraisalDate)
  
          const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Los_Angeles",
            year: "numeric",
            month: "2-digit",
          }).formatToParts(date)
  
          const year = parts.find((p) => p.type === "year")!.value
          const month = parts.find((p) => p.type === "month")!.value
  
          const dateKey = `${year}-${month}`
  
          const label = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Los_Angeles",
            year: "numeric",
            month: "long",
          }).format(date)
  
          if (!(dateKey in acc)) {
            acc[dateKey] = {
              dateKey,
              label,
              lowerBound: 0,
              upperBound: 0,
              median: 0,
              average: 0,
              estimate: 0
            }
          }
  
          // update values
          acc[dateKey].lowerBound = acc[dateKey].lowerBound + Number(appraisal.lowerBound)
          acc[dateKey].upperBound = acc[dateKey].upperBound + Number(appraisal.upperBound) 
          acc[dateKey].median = acc[dateKey].median + Number(appraisal.median) 
          acc[dateKey].average = acc[dateKey].average + Number(appraisal.average) 
          acc[dateKey].estimate = acc[dateKey].estimate + Number(appraisal.estimate)
        })
      }
  
      const sortedPortfolioValueData = Object.values(acc).sort(
        (a, b) => a.dateKey.localeCompare(b.dateKey)
      )
  
      return sortedPortfolioValueData
    }, [cards])

    const lowerBound = portfolioValueData[portfolioValueData.length - 1].lowerBound
    const upperBound = portfolioValueData[portfolioValueData.length - 1].upperBound
    const estimate = portfolioValueData[portfolioValueData.length - 1].estimate
    const previousMonthEstimate = portfolioValueData.length > 1 ? portfolioValueData[portfolioValueData.length - 2].estimate : 0

    const monthlyEstimatePercentChange = Math.round(((estimate / previousMonthEstimate) - 1) * 10000) / 100
    
  return (
    <Card className="flex flex-col gap-y-2">
      <div className="px-5 flex items-center text-xl gap-2">
        <CircleDollarSign className="text-green-700" />
        Portfolio Value
      </div>
      <CardContent className="text-4xl font-medium">
        {lowerBound.toLocaleString()} - {upperBound.toLocaleString()}
      </CardContent>
      <CardFooter className="text-base">
        {monthlyEstimatePercentChange > 0 ? (
          <div className="flex items-center gap-x-2">Trending up by {monthlyEstimatePercentChange}% this month. <TrendingUp className="w-5 h-5 text-green-700" /></div>
        ) : monthlyEstimatePercentChange == 0 ? (
          <div>No change from last month</div>
        ) : (
          <div className="flex items-center gap-x-2">Trending down by {monthlyEstimatePercentChange * -1}% this month. <TrendingDown className="w-5 h-5 text-red-700" /></div>
        )}
      </CardFooter>
    </Card>
  )
}