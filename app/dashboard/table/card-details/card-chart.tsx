"use client"

import { LineChartIcon } from "lucide-react"

import { 
  CartesianGrid, 
  Line, 
  LineChart, 
  XAxis, 
  YAxis 
} from "recharts"

import { 
  ChartConfig,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"

import { TradingCard } from "../../types"
import { Card } from "@/components/ui/card"

type AppraisalChartPoint = {
  month: string
  lowerBound: number
  upperBound: number
  median: number
  average: number
  estimate: number
}

function prepareAppraisalChartData(card: TradingCard): AppraisalChartPoint[] {
  const monthGroups: Record<string, AppraisalChartPoint[]> = {}

  for (const appraisal of card.appraisalData) {
    const date = appraisal.appraisalDate
    const monthKey = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    })

    const numericAppraisal: Omit<AppraisalChartPoint, "month"> = {
      lowerBound: parseFloat(appraisal.lowerBound),
      upperBound: parseFloat(appraisal.upperBound),
      median: parseFloat(appraisal.median),
      average: parseFloat(appraisal.average),
      estimate: parseFloat(appraisal.estimate),
    }

    if (!monthGroups[monthKey]) monthGroups[monthKey] = []
    monthGroups[monthKey].push({ month: monthKey, ...numericAppraisal })
  }

  const combined: AppraisalChartPoint[] = Object.entries(monthGroups).map(
    ([month, values]) => {
      const count = values.length
      const sumFields = values.reduce(
        (acc, curr) => {
          acc.lowerBound += curr.lowerBound
          acc.upperBound += curr.upperBound
          acc.median += curr.median
          acc.average += curr.average
          acc.estimate += curr.estimate
          return acc
        },
        { lowerBound: 0, upperBound: 0, median: 0, average: 0, estimate: 0 }
      )

      return {
        month,
        lowerBound: sumFields.lowerBound / count,
        upperBound: sumFields.upperBound / count,
        median: sumFields.median / count,
        average: sumFields.average / count,
        estimate: sumFields.estimate / count,
      }
    }
  )

  combined.sort(
    (a, b) =>
      new Date(a.month + " 1").getTime() - new Date(b.month + " 1").getTime()
  )

  return combined
}

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig

export function CardChart({
  card
}: {
  card: TradingCard
}) {
  const data = prepareAppraisalChartData(card)

  const dataForEstimate = data.map(month => ({
    month: month.month,
    value: month.estimate
  }))

  return (
    <div>
      <div>
        <div className="flex items-center gap-x-2 text-xl font-medium">
          <LineChartIcon className="text-fuchsia-700" />
          {card.name} Value History
        </div>
        <ChartContainer config={chartConfig} className="h-58 max-w-full">
          <LineChart data={dataForEstimate}>
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              tickMargin={10}
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
      </div>
    </div>
  )
}