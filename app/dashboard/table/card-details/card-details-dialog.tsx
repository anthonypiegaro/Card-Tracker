"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

import { CardChart } from "./card-chart"
import { CardDetails } from "./card-details"
import { CardHistory } from "./card-history"

import { TradingCard } from "../../types"

type Tab = "History" | "Chart" | "Details"
const tabs: Tab[] = ["History", "Chart", "Details"]

export function CardDetailsDialog({
  open,
  onOpenChange,
  card
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  card: TradingCard
}) {
  const [tab, setTab] = useState<Tab>("Details")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-9/10 w-full overflow-y-auto">
        <DialogTitle className="sr-only">
          {card.name} Details
        </DialogTitle>
        <div className="flex p-1 mx-auto border border-input rounded-lg h-fit">
          {tabs.map(tabOption => (
            <div
              key={tabOption}
              onClick={() => setTab(tabOption)}
              className={cn(
                "font-medium text-muted-foreground cursor-pointer rounded-md hover:bg-accent/80 w-18 text-center transition-all",
                tabOption === tab && "bg-accent hover:bg-accent text-black dark:text-white"
              )}
            >
              {tabOption}
            </div>
          ))}
        </div>
        {tab === "History" && <CardHistory card={card} />}
        {tab === "Chart" && <CardChart card={card} />}
        {tab === "Details" && <CardDetails card={card} />}
      </DialogContent>
    </Dialog>
  )
}