import { PortfolioValue } from "./portfolio-value"
import { PortfolioValueHistory } from "./portfolio-value-history"
import { TotalCards } from "./total-cards"

import { PortfolioValuation, TradingCard } from "../types"

export function Charts({
  cards,
  portfolioValuations
}: {
  cards: TradingCard[]
  portfolioValuations: PortfolioValuation[]
}) {
  const totalCards = cards.reduce((acc, card) => acc + card.quantity, 0)

  const currentPortfolioValue = cards.reduce((acc, card) => acc + card.quantity * Number(card.estimate), 0)

  const monthlyPercentChange = getMonthlyPercentChange(currentPortfolioValue, portfolioValuations)

  return (
    <div className="px-2 my-18 md:my-12 mx-auto max-w-full md:max-w-3xl grid md:grid-cols-2 gap-2">
      <div className="w-full md:col-span-2">
        <PortfolioValueHistory cards={cards} />
      </div>
      <PortfolioValue portfolioValue={currentPortfolioValue} monthlyPercentChange={monthlyPercentChange} />
      <TotalCards totalCards={totalCards} />
    </div>
  )
}

function getMonthlyPercentChange(currentPortfolioValue: number, portfolioValuations: PortfolioValuation[]) {
  const today = new Date()
  const previousMonthDate = new Date(today.getFullYear(), today.getMonth() - 1)
  const previousMonth = previousMonthDate.getMonth()
  const previousMonthYear = previousMonthDate.getFullYear()

  const { prevMonthTotal, prevMonthObs } = portfolioValuations.reduce((acc, valuation) => {
    if (valuation.date.getFullYear() === previousMonthYear && valuation.date.getMonth() === previousMonth) {
      acc.prevMonthTotal = acc.prevMonthTotal + valuation.value
      acc.prevMonthObs++
    }
  
    return acc
  }, { prevMonthTotal: 0, prevMonthObs: 0 })

  if (prevMonthObs === 0 || prevMonthTotal === 0) return 0

  const prevMonthPortfolioValue = prevMonthTotal / prevMonthObs

  const monthlyPercentChange = Math.round(((currentPortfolioValue - prevMonthPortfolioValue) / prevMonthPortfolioValue) * 10000) / 100

  return monthlyPercentChange
}