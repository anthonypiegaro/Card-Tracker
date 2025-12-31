"use client"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { TradingCard } from "../types"

export function Table({
  tradingCards
}: {
  tradingCards: TradingCard[]
}) {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <DataTable data={tradingCards} columns={columns} />
    </div>
  )
}