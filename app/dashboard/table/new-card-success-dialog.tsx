"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type NewCardSuccessDialogDetails = {
  name: string
  quantity: number
  estimate: string
  lowerBound: string
  upperBound: string
  median: string
  average: string
}

export function NewCardSuccessDialog({
  open,
  onOpenChange,
  details
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  details: NewCardSuccessDialogDetails
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle>New Card Success Details</DialogTitle>
        </DialogHeader>
        <div className="w-full">

          <div className="text-center text-3xl mb-4">
            {details.name}
            {details.quantity > 1 && <span className="text-muted-foreground text-sm"> x{details.quantity}</span>}
          </div>

          <div className="text-center mb-4">
            <span className="border-b-2 border-primary text-3xl font-medium">${details.estimate}</span>
            <div className="py-1 text-muted-foreground">Estimated Market Value</div>
          </div>

          <div className="grid grid-cols-2">
            <div className="text-center col-span-2">
              <span className="text-xl">${details.lowerBound} - ${details.upperBound}</span>
              <div className="text-muted-foreground -translate-y-1.5 text-sm">range</div>
            </div>
            <div className="text-center">
              <span className="text-xl">${details.median}</span>
              <div className="text-muted-foreground -translate-y-1.5 text-sm">median</div>
            </div>
            <div className="text-center">
              <span className="text-xl">${details.average}</span>
              <div className="text-muted-foreground -translate-y-1.5 text-sm">average</div>
            </div>
          </div>

          <Button 
            type="button" 
            variant="secondary" 
            className="w-full mt-4 cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  )
}