"use client"

import { useState } from "react"

import { columns } from "./columns"
import { CardDetailsDialog } from "./card-details/card-details-dialog"
import { CreateNewCardDialog } from "./create-new-card-dialog"
import { DataTable } from "./data-table"
import { DeleteCardDialog } from "./delete-card-dialog"
import { 
  NewCardSuccessDialog, 
  NewCardSuccessDialogDetails 
} from "./new-card-success-dialog"
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
  appraisals: [],
  createdAt: new Date("2025-01-01T10:00:00Z"),
  updatedAt: new Date("2025-01-01T10:00:00Z")
}

const dummyNewCardSuccessDetails: NewCardSuccessDialogDetails = {
  name: "",
  quantity: 0,
  estimate: "",
  lowerBound: "",
  upperBound: "",
  median: "",
  average: ""
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
  const [newCardSuccessDetails, setNewCardSuccessDetails] = useState<null | NewCardSuccessDialogDetails>(null)

  const handleCreateNewCardDialogOpenChange = (open: boolean) => {
    setCreateNewCardDialogOpen(open)
  }

  const handleCreateNewCardSuccess = (card: TradingCard) => {
    setCards(prev => [...prev, card])

    setNewCardSuccessDetails({
      name: card.name,
      quantity: card.quantity,
      lowerBound: card.lowerBound,
      upperBound: card.upperBound,
      median: card.median,
      average: card.average,
      estimate: card.estimate
    })
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

  const handleNewCardSuccessDialogOpenChange = (open: boolean) => {
    if (!open) {
      setNewCardSuccessDetails(null)
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
      <NewCardSuccessDialog 
        open={newCardSuccessDetails !== null}
        onOpenChange={handleNewCardSuccessDialogOpenChange}
        details={newCardSuccessDetails ?? dummyNewCardSuccessDetails}
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