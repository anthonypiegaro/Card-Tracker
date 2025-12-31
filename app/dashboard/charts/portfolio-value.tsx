import { 
  CircleDollarSign,
  TrendingDown,
  TrendingUp
} from "lucide-react"

import { 
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle
} from "@/components/ui/card"

export function PortfolioValue({
  lowerBound,
  upperBound,
  monthlyPercentChange
}: {
  lowerBound: number
  upperBound: number
  monthlyPercentChange: number
}) {
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
        {monthlyPercentChange > 0 ? (
          <div className="flex items-center gap-x-2">Trending up by {monthlyPercentChange}% this month. <TrendingUp className="w-5 h-5 text-green-700" /></div>
        ) : monthlyPercentChange == 0 ? (
          <div>No change from last month</div>
        ) : (
          <div className="flex items-center gap-x-2">Trending down by {monthlyPercentChange * -1}% this month. <TrendingDown className="w-5 h-5 text-red-700" /></div>
        )}
      </CardFooter>
    </Card>
  )
}