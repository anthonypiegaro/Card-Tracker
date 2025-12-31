import { 
  IdCard,
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

export function TotalCards({
  totalCards,
  monthlyCardChange
}: {
  totalCards: number
  monthlyCardChange: number
}) {
  return (
    <Card className="flex flex-col gap-y-2">
      <div className="px-5 flex flex-row items-center text-xl gap-2">
        <IdCard className="text-blue-700" />
        Total Cards
      </div>
      <CardContent className="text-4xl font-medium">
        {totalCards.toLocaleString()}
      </CardContent>
      <CardFooter className="text-base">
        {monthlyCardChange > 0 ? (
          <div className="flex items-center gap-x-2">Up {monthlyCardChange} {monthlyCardChange > 1 ? "cards" : "card"} this month. <TrendingUp className="w-5 h-5 text-green-700" /></div>
        ) : monthlyCardChange === 0 ? (
          <div>No change in cards this month.</div>
        ) : (
          <div className="flex items-center gap-x-2">Down {monthlyCardChange * -1} {monthlyCardChange < -1 ? "cards" : "card"} this month. <TrendingDown className="w-5 h-5 text-red-700" /></div>
        )}
      </CardFooter>
    </Card>
  )
}