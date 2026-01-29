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
  appraisals: {
    id: string
    appraisalDate: Date
    lowerBound: string
    upperBound: string
    median: string
    average: string
    estimate: string
  }[]
}

export type Appraisal = {
  lowerBound: number
  median: number
  average: number
  estimate: number
  upperBound: number
  confidence: number
}

export type PortfolioValuation = {
  id: string
  value: number
  date: Date
}