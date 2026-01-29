"use client"

import { useState } from "react"

import { Charts } from "./charts/charts"
import { Table } from "./table/table"

import { PortfolioValuation, TradingCard } from "./types"

export function Wrapper({
  tradingCards,
  portfolioValuations
}: {
  tradingCards: TradingCard[]
  portfolioValuations: PortfolioValuation[]
}) {
  const [cards, setCards] = useState<TradingCard[]>(tradingCards)

  return (
    <>
      <Charts cards={cards} portfolioValuations={portfolioValuations} />
      <Table cards={cards} setCards={setCards} />
    </>
  )
}