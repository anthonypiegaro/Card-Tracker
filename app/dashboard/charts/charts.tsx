import { PortfolioValue } from "./portfolio-value"
import { PortfolioValueHistory } from "./portfolio-value-history"
import { TotalCards } from "./total-cards"

import { TradingCard } from "../types"

export function Charts({
  cards
}: {
  cards: TradingCard[]
}) {
  const totalCards = cards.reduce((acc, card) => acc + card.quantity, 0)

  return (
    <div className="px-2 my-18 md:my-12 mx-auto max-w-full md:max-w-3xl grid md:grid-cols-2 gap-2">
      <div className="w-full md:col-span-2">
        <PortfolioValueHistory cards={cards} />
      </div>
      <PortfolioValue cards={cards} />
      <TotalCards totalCards={totalCards} />
    </div>
  )
}