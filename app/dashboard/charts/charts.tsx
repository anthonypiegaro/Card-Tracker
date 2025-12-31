import { PortfolioValue } from "./portfolio-value"
import { PortfolioValueHistory } from "./portfolio-value-history"
import { TotalCards } from "./total-cards"

export function Charts() {
  return (
    <div className="px-2 my-18 md:my-12 mx-auto max-w-full md:max-w-3xl grid md:grid-cols-2 gap-2">
      <div className="w-full md:col-span-2">
        <PortfolioValueHistory />
      </div>
      <PortfolioValue lowerBound={3400} upperBound={23010} monthlyPercentChange={12} />
      <TotalCards totalCards={1033} monthlyCardChange={10}/>
    </div>
  )
}