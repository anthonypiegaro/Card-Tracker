"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { mockApiCall } from "@/lib/utils"

import { TradingCard } from "../types"

export function DeleteCardDialog({
  open,
  onOpenChange,
  onSuccess,
  card
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (card: TradingCard) => void
  card: TradingCard
}) {
  const [submitting, setSubmitting] = useState(false)

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
  }

  const handleDelete = async () => {
    setSubmitting(true)
  
    await mockApiCall({
      delay: 3000,
      shouldSucceed: true,
      responseData: { message: "Success" },
      errorData: { message: "error" }
    })
    .then(() => {
      toast.success("Success", {
        description: `Deleted ${card.name}`
      })
      onSuccess(card)
      handleOpenChange(false)
    })
    .catch(e => {
      toast.error("Error", {
        description: e.message
      })
    })

    setSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Card
          </DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">
          Are you sure you want to delete <span className="text-destructive">{card.name}</span>
          <span className="text-destructive"> {card.name}</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-x-2 justify-end">
          <Button variant="ghost" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {submitting ? <><Spinner /> Deleting...</> : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )  
}