import { Logo } from "./logo"
import { SettingsTab } from "./settings-tab"
import { Wrapper } from "./wrapper"

import { getCards } from "./get-cards"

import { TradingCard } from "./types"

export default async  function Dashboard() {
  const tradingCards = await getCards()

  return (
    <div className="overflow-x-hidden">
      <Logo />
      <SettingsTab />
      <Wrapper tradingCards={tradingCards} />
    </div>
  )
}