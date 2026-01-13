"use client"

import { useState } from "react"

import { columns } from "./columns"
import { CardDetailsDialog } from "./card-details/card-details-dialog"
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
  createdAt: new Date("2025-01-01T10:00:00Z"),
  updatedAt: new Date("2025-01-01T10:00:00Z")
}

export function Table({
  cards,
  setCards
}: {
  cards: TradingCard[]
  setCards: React.Dispatch<React.SetStateAction<TradingCard[]>>
}) {
  const [createNewCardDialogOpen, setCreateNewCardDialogOpen] = useState(false)
  const [cardToDelete, setCardToDelete] = useState<null | TradingCard>(null)
  const [detailsDialogCard, setDetailsDialogCard] = useState<null | TradingCard>(null)

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

  const handleDetailsDialogOpenChange = (open: boolean) => {
    if (!open) {
      setDetailsDialogCard(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <CardDetailsDialog 
        open={detailsDialogCard !== null}
        onOpenChange={handleDetailsDialogOpenChange}
        card={detailsDialogCard ?? dummyCard}
      />
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
        setDetailsDialogCard={setDetailsDialogCard}
      />
    </div>
  )
}