import { IdCard, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import { 
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { TradingCard } from "../types"

export function TotalCards({
  cards
}: {
  cards: TradingCard[]
}) {
  const totalCards = cards.reduce((acc, card) => {
    acc = acc + card.quantity
    return acc
  }, 0)

  return (
    <Card className="flex flex-col gap-y-2">
      <div className="px-5 flex flex-row items-center text-xl gap-2">
        <IdCard className="text-blue-700" />
        Total Cards
      </div>
      <CardContent className="text-4xl font-medium">
        {totalCards.toLocaleString()}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          asChild
        >
          <a
            href="https://www.ebay.com/sch/i.html?_nkw=baseball+cards"
            target="_blank"
          >
            <Store /> 
            <span>Get more cards</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}