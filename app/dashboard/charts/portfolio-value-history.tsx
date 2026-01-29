"use client"

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

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig

export function PortfolioValueHistory({
  chartData
}: {
  chartData: {
    date: string
    value: number
  }[]
}) {

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
            dataKey="date"
            tickLine={false}
            axisLine={false}
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