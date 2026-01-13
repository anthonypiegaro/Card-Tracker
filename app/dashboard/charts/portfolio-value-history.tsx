"use client"

import { useMemo, useState } from "react"
import { LineChart as LineChartIcon } from "lucide-react"
import { 
  CartesianGrid, 
  Line, 
  LineChart,
  XAxis,
  YAxis
} from "recharts"

import { Card } from "@/components/ui/card"
import { 
  ChartContainer, 
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

import { TradingCard } from "../types"

// export const portfolioValueData: PortfolioValueChartData[] = [
//   { month: "Jan", value: 4820 },
//   { month: "Feb", value: 4950 },
//   { month: "Mar", value: 5120 },
//   { month: "Apr", value: 4990 },
//   { month: "May", value: 5250 },
//   { month: "Jun", value: 5410 },
//   { month: "Jul", value: 5580 },
//   { month: "Aug", value: 5610 },
//   { month: "Sep", value: 5730 },
//   { month: "Oct", value: 5960 },
//   { month: "Nov", value: 6120 },
//   { month: "Dec", value: 6375 },
// ]

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig

type MonthlyAppraisalData = {
  dateKey: string
  label: string
  lowerBound: number
  upperBound: number
  median: number
  average: number
  estimate: number
}

type Metric = "Lower Bound" | "Upper Bound" | "Median" | "Average" | "Estimate"

export function PortfolioValueHistory({
  cards
}: {
  cards: TradingCard[]
}) {
  const [chartMetric, setChartMetric] = useState<Metric>("Estimate")

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

  console.log(JSON.stringify(portfolioValueData))

  const chartData = useMemo(() => {
    const data = portfolioValueData.map(monthData => {
      let value = 0
      switch (chartMetric) {
        case "Lower Bound":
          value = monthData.lowerBound
          break
        case "Upper Bound":
          value = monthData.upperBound
          break
        case "Median":
          value = monthData.median
          break
        case "Average":
          value = monthData.average
          break
        case "Estimate":
          value = monthData.estimate
          break
      }

      return {
        month: monthData.label,
        value
      }
    })

    return data
  }, [portfolioValueData, chartMetric])

  return (
    <Card className="w-full max-w-full px-5 py-4 scrollbar-hidden">
      <div className="flex items-center gap-x-2 text-xl font-medium">
        <LineChartIcon className="text-fuchsia-700" />
        Portfolio Value History
      </div>
      <ChartContainer config={chartConfig} className="h-58 max-w-full">
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis 
            interval={0}
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            tickMargin={10}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis domain={["auto", "auto"]} hide={true} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            dataKey="value" 
            stroke="var(--color-value)" 
            strokeWidth={2}
            fill="var(--color-value)"
          />
        </LineChart>
      </ChartContainer>
    </Card>
  )
}