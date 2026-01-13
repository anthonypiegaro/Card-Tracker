export type TradingCard = {
  id: string
  name: string
  notes: string
  quantity: number
  createdAt: Date
  updatedAt: Date
  lowerBound: string
  upperBound: string
  median: string
  average: string
  estimate: string
  appraisalData: {
    id: string
    appraisalDate: Date
    lowerBound: string
    upperBound: string
    median: string
    average: string
    estimate: string
  }[]
}