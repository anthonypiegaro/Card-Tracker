export type PortfolioValueChartData = {
  month: string
  value: number 
}

export type TradingCard = {
  id: string
  name: string
  notes: string
  quantity: number
  createdAt: string
  updatedAt: string
  lowerBound: string
  upperBound: string
  median: string
  average: string
  estimate: string
  appraisalData: {
    id: string
    appraisalDate: string
    lowerBound: string
    upperBound: string
    median: string
    average: string
    estimate: string
  }[]
}