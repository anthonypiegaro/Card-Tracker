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

import { PortfolioValueChartData } from "../types"

export const portfolioValueData: PortfolioValueChartData[] = [
  { month: "Jan", value: 4820 },
  { month: "Feb", value: 4950 },
  { month: "Mar", value: 5120 },
  { month: "Apr", value: 4990 },
  { month: "May", value: 5250 },
  { month: "Jun", value: 5410 },
  { month: "Jul", value: 5580 },
  { month: "Aug", value: 5610 },
  { month: "Sep", value: 5730 },
  { month: "Oct", value: 5960 },
  { month: "Nov", value: 6120 },
  { month: "Dec", value: 6375 },
]

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig

export function PortfolioValueHistory() {
  return (
    <Card className="w-full px-5 py-4">
      <div className="flex items-center gap-x-2 text-xl font-medium">
        <LineChartIcon className="text-fuchsia-700" />
        Portfolio Value History
      </div>
      <ChartContainer config={chartConfig} className="h-58 w-full">
        <LineChart data={portfolioValueData}>
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
    </Card>
  )
}