"use client"

import { useState } from "react"

import { columns } from "./columns"
import { CreateNewCardDialog } from "./create-new-card-dialog"
import { DataTable } from "./data-table"
import { TradingCard } from "../types"

export function Table({
  tradingCards
}: {
  tradingCards: TradingCard[]
}) {
  const [cards, setCards] = useState<TradingCard[]>(tradingCards)
  const [createNewCardDialogOpen, setCreateNewCardDialogOpen] = useState(false)

  const handleCreateNewCardDialogOpenChange = (open: boolean) => {
    setCreateNewCardDialogOpen(open)
  }

  const handleCreateNewCardSuccess = (card: TradingCard) => {
    setCards(prev => [...prev, card])
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <CreateNewCardDialog
        open={createNewCardDialogOpen}
        onOpenChange={handleCreateNewCardDialogOpenChange}
        onSuccess={handleCreateNewCardSuccess}
      />
      <DataTable 
        data={cards} 
        columns={columns} 
        onOpenCreateNewCardDialog={() => setCreateNewCardDialogOpen(true)}
      />
    </div>
  )
}