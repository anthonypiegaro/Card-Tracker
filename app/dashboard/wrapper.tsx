"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Charts } from "./charts/charts"
import { Table } from "./table/table"

import { Appraisal, TradingCard } from "./types"
import { getCardAppraisal } from "./get-card-appraisal"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Wrapper({
  tradingCards
}: {
  tradingCards: TradingCard[]
}) {
  const [cards, setCards] = useState<TradingCard[]>(tradingCards)
  const [cardToAppraise, setCardToAppraise] = useState<string>("")
  const [cardIsBeingAppraised, setCardIsBeingAppraised] = useState(false)
  const [appraisal, setAppraisal] = useState<Appraisal | null>(null)

  const appraiseCard = async () => {
    setCardIsBeingAppraised(true)

    await getCardAppraisal(cardToAppraise)
      .then(data => {
        setAppraisal(data)
        toast.success("Success", {
          description: `${cardToAppraise} has been appraised`
        })
      })
      .catch(error => {
        toast.error("Error", {
          description: error.message
        })
      })
    
    setCardIsBeingAppraised(false)
  }

  return (
    <>
      <div className="ml-100">
        <Label>Card</Label>
        <Input 
          value={cardToAppraise} 
          disabled={cardIsBeingAppraised} 
          className="w-sm"
          onChange={e => setCardToAppraise(e.target.value)} 
        />
        {appraisal && 
          <div>
            <p>Last appraisal:</p>
            <div>
              <div>Lower Bound: {appraisal.lowerBound}</div>
              <div>Median: {appraisal.median}</div>
              <div>Average: {appraisal.average}</div>
              <div>Estimate: {appraisal.estimate}</div>
              <div>UpperBound: {appraisal.upperBound}</div>
            </div>
          </div>
        }
        <Button type="button" variant="outline" onClick={appraiseCard} disabled={cardIsBeingAppraised || cardToAppraise.length === 0}>
          Submit
        </Button>
      </div>
      <Charts cards={cards} />
      <Table cards={cards} setCards={setCards} />
    </>
  )
}