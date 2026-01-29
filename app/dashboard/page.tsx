import { Logo } from "./logo"
import { SettingsTab } from "./settings-tab"
import { Wrapper } from "./wrapper"

import { getCards } from "./get-cards"
import { getPortfolioEvaluations } from "./get-portfolio-evaluations"

export default async  function Dashboard() {
  const [tradingCards, portfolioValuations] = await Promise.all([
    getCards(),
    getPortfolioEvaluations()
  ])

  return (
    <div className="overflow-x-hidden">
      <Logo />
      <SettingsTab />
      <Wrapper tradingCards={tradingCards} portfolioValuations={portfolioValuations}/>
    </div>
  )
}