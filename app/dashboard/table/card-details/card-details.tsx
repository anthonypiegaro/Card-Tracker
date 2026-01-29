"use client"

import { Button } from "@/components/ui/button"
import { usdFormatter } from "@/lib/formatters/usd-formatter"

import type { TradingCard } from "../../types"

export function CardDetails({
  card,
}: {
  card: TradingCard
}) {
  const ebayURL = "https://www.ebay.com/sch/i.html?_nkw=" + encodeURIComponent(card.name)

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight mb-3">{card.name}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Quantity:</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {card.quantity}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <h3 className="text-sm font-medium text-muted-foreground">Most Recent Appraisal</h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Lower Bound</div>
            <div className="text-lg font-semibold">{usdFormatter.format(Number(card.lowerBound))}</div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Upper Bound</div>
            <div className="text-lg font-semibold">{usdFormatter.format(Number(card.upperBound))}</div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Average</div>
            <div className="text-lg font-semibold">{usdFormatter.format(Number(card.average))}</div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Median</div>
            <div className="text-lg font-semibold">{usdFormatter.format(Number(card.median))}</div>
          </div>

          <div className="rounded-lg border bg-primary/5 p-3 space-y-1 col-span-2 sm:col-span-2">
            <div className="text-xs font-medium text-muted-foreground">Current Estimate</div>
            <div className="text-2xl font-bold text-primary">{usdFormatter.format(Number(card.estimate))}</div>
          </div>
        </div>
      </div>

      <Button asChild size="lg" className="w-full">
        <a href={ebayURL} target="_blank" rel="noopener noreferrer">
          View on eBay
        </a>
      </Button>
    </div>
  )
}