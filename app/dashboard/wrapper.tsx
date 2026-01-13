"use client"

import { useState } from "react"

import { Charts } from "./charts/charts"
import { Table } from "./table/table"

import { TradingCard } from "./types"

export function Wrapper({
  tradingCards
}: {
  tradingCards: TradingCard[]
}) {
  const [cards, setCards] = useState<TradingCard[]>(tradingCards)

  return (
    <>
      <Charts cards={cards} />
      <Table cards={cards} setCards={setCards} />
    </>
  )
}