"use client"

import { useState } from "react"

import { columns } from "./columns"
import { CreateNewCardDialog } from "./create-new-card-dialog"
import { DataTable } from "./data-table"
import { DeleteCardDialog } from "./delete-card-dialog"
import { TradingCard } from "../types"

const dummyCard: TradingCard = {
  id: "",
  name: "",
  notes: "",
  quantity: 0,
  lowerBound: "",
  upperBound: "",
  median: "",
  average: "",
  estimate: "",
  appraisalData: [],
  createdAt: "",
  updatedAt: ""
}

export function Table({
  tradingCards
}: {
  tradingCards: TradingCard[]
}) {
  const [cards, setCards] = useState<TradingCard[]>(tradingCards)
  const [createNewCardDialogOpen, setCreateNewCardDialogOpen] = useState(false)
  const [cardToDelete, setCardToDelete] = useState<null | TradingCard>(null)

  const handleCreateNewCardDialogOpenChange = (open: boolean) => {
    setCreateNewCardDialogOpen(open)
  }

  const handleCreateNewCardSuccess = (card: TradingCard) => {
    setCards(prev => [...prev, card])
  }

  const handleDeleteCardDialogOpenChange = (open: boolean) => {
    if (!open) {
      setCardToDelete(null)
    }
  }

  const handleCardDeleteSuccess = (card: TradingCard) => {
    setCards(prev => prev.filter(c => c.id !== card.id))
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <CreateNewCardDialog
        open={createNewCardDialogOpen}
        onOpenChange={handleCreateNewCardDialogOpenChange}
        onSuccess={handleCreateNewCardSuccess}
      />
      <DeleteCardDialog
        open={cardToDelete !== null}
        onOpenChange={handleDeleteCardDialogOpenChange}
        onSuccess={handleCardDeleteSuccess}
        card={cardToDelete ?? dummyCard}
      />
      <DataTable
        data={cards} 
        columns={columns} 
        onOpenCreateNewCardDialog={() => setCreateNewCardDialogOpen(true)}
        setCardToDelete={setCardToDelete}
      />
    </div>
  )
}