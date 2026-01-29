"use client"

import { usdFormatter } from "@/lib/formatters/usd-formatter"

import { TradingCard } from "../../types"

export function CardHistory({
  card,
}: {
  card: TradingCard
}) {
  return (
    <div className="w-full mx-auto max-w-xl space-y-6">
      <h2 className="text-2xl font-semibold text-center">Appraisal History</h2>

      <div className="space-y-4">
        {card.appraisals.map((appraisal, index) => (
          <div key={`${appraisal.appraisalDate.getTime()}-${index}`} className="relative border rounded-lg p-4 bg-card">
            <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-primary border-4 border-background" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                {appraisal.appraisalDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                Appraisal #{card.appraisals.length - index}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Lower Bound</p>
                <p className="text-base font-semibold">{usdFormatter.format(Number(appraisal.lowerBound))}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Upper Bound</p>
                <p className="text-base font-semibold">{usdFormatter.format(Number(appraisal.upperBound))}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Average</p>
                <p className="text-base font-semibold">{usdFormatter.format(Number(appraisal.average))}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Median</p>
                <p className="text-base font-semibold">{usdFormatter.format(Number(appraisal.median))}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estimated Value</span>
                <span className="text-xl font-bold text-primary">{usdFormatter.format(Number(appraisal.estimate))}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {card.appraisals.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No appraisal history available</div>
      )}
    </div>
  )
}
