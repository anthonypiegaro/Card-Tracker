import { Charts } from "./charts/charts"
import { Logo } from "./logo"
import { SettingsTab } from "./settings-tab"
import { Table } from "./table/table"

import { TradingCard } from "./types"

export const tradingCards: TradingCard[] = [
  {
    id: "1",
    name: "Babe Ruth Rookie Card",
    notes: "Iconic card from Ruth’s early career.",
    quantity: 2,
    createdAt: new Date("2025-01-02T14:33:00Z"),
    updatedAt: new Date("2025-12-15T09:15:00Z"),
    lowerBound: "480000",
    upperBound: "650000",
    median: "560000",
    average: "570000",
    estimate: "590000",
    appraisalData: [
      {
        id: "1a",
        appraisalDate: new Date("2024-11-15T00:00:00Z"),
        lowerBound: "500000",
        upperBound: "640000",
        median: "560000",
        average: "570000",
        estimate: "585000",
      },
    ],
  },
  {
    id: "2",
    name: "Willie Mays Topps 1952",
    notes: "Topps first edition with clean corners.",
    quantity: 1,
    createdAt: new Date("2024-09-20T12:00:00Z"),
    updatedAt: new Date("2025-12-20T16:00:00Z"),
    lowerBound: "125000",
    upperBound: "180000",
    median: "150000",
    average: "152000",
    estimate: "160000",
    appraisalData: [
      {
        id: "2a",
        appraisalDate: new Date("2024-10-02T00:00:00Z"),
        lowerBound: "130000",
        upperBound: "175000",
        median: "150000",
        average: "152000",
        estimate: "160000",
      },
    ],
  },
  {
    id: "3",
    name: "Mickey Mantle 1952 Topps",
    notes: "One of the most sought-after baseball cards.",
    quantity: 1,
    createdAt: new Date("2024-10-01T09:45:00Z"),
    updatedAt: new Date("2025-12-10T09:40:00Z"),
    lowerBound: "850000",
    upperBound: "1300000",
    median: "1200000",
    average: "1120000",
    estimate: "1150000",
    appraisalData: [
      {
        id: "3a",
        appraisalDate: new Date("2025-01-05T00:00:00Z"),
        lowerBound: "900000",
        upperBound: "1280000",
        median: "1180000",
        average: "1120000",
        estimate: "1150000",
      },
    ],
  },
  {
    id: "4",
    name: "Jackie Robinson 1948 Leaf",
    notes: "Historic card of civil rights icon.",
    quantity: 3,
    createdAt: new Date("2025-02-10T14:00:00Z"),
    updatedAt: new Date("2025-12-05T14:00:00Z"),
    lowerBound: "250000",
    upperBound: "370000",
    median: "300000",
    average: "305000",
    estimate: "310000",
    appraisalData: [
      {
        id: "4a",
        appraisalDate: new Date("2025-03-12T00:00:00Z"),
        lowerBound: "260000",
        upperBound: "360000",
        median: "300000",
        average: "305000",
        estimate: "310000",
      },
    ],
  },
  {
    id: "5",
    name: "Hank Aaron 1954 Topps",
    notes: "Excellent surface and print quality.",
    quantity: 4,
    createdAt: new Date("2025-01-04T10:30:00Z"),
    updatedAt: new Date("2025-11-30T09:00:00Z"),
    lowerBound: "60000",
    upperBound: "90000",
    median: "80000",
    average: "78000",
    estimate: "82000",
    appraisalData: [
      {
        id: "5a",
        appraisalDate: new Date("2024-12-10T00:00:00Z"),
        lowerBound: "65000",
        upperBound: "88000",
        median: "80000",
        average: "78000",
        estimate: "82000",
      },
    ],
  },
  {
    id: "6",
    name: "Ted Williams 1939 Play Ball",
    notes: "Rookie card in PSA 8 condition.",
    quantity: 1,
    createdAt: new Date("2024-11-10T09:00:00Z"),
    updatedAt: new Date("2025-10-09T09:00:00Z"),
    lowerBound: "95000",
    upperBound: "140000",
    median: "120000",
    average: "118000",
    estimate: "125000",
    appraisalData: [
      {
        id: "6a",
        appraisalDate: new Date("2024-12-12T00:00:00Z"),
        lowerBound: "97000",
        upperBound: "138000",
        median: "120000",
        average: "118000",
        estimate: "125000",
      },
    ],
  },
  {
    id: "7",
    name: "Roberto Clemente 1955 Topps",
    notes: "Bright colors and clean edges.",
    quantity: 2,
    createdAt: new Date("2025-03-20T12:20:00Z"),
    updatedAt: new Date("2025-12-28T12:20:00Z"),
    lowerBound: "70000",
    upperBound: "95000",
    median: "85000",
    average: "84000",
    estimate: "86000",
    appraisalData: [
      {
        id: "7a",
        appraisalDate: new Date("2025-04-02T00:00:00Z"),
        lowerBound: "72000",
        upperBound: "94000",
        median: "85000",
        average: "84000",
        estimate: "86000",
      },
    ],
  },
  {
    id: "8",
    name: "Derek Jeter 1993 SP Foil",
    notes: "Modern classic rookie card.",
    quantity: 5,
    createdAt: new Date("2025-01-08T11:20:00Z"),
    updatedAt: new Date("2025-12-14T05:00:00Z"),
    lowerBound: "20000",
    upperBound: "34000",
    median: "28000",
    average: "29000",
    estimate: "30000",
    appraisalData: [
      {
        id: "8a",
        appraisalDate: new Date("2024-10-12T00:00:00Z"),
        lowerBound: "21000",
        upperBound: "33500",
        median: "28000",
        average: "29000",
        estimate: "30000",
      },
    ],
  },
  {
    id: "9",
    name: "Ken Griffey Jr. 1989 Upper Deck",
    notes:
      "High‑grade rookie card still popular among collectors.",
    quantity: 12,
    createdAt: new Date("2025-04-10T18:40:00Z"),
    updatedAt: new Date("2025-12-18T11:10:00Z"),
    lowerBound: "2500",
    upperBound: "4500",
    median: "3500",
    average: "3600",
    estimate: "3700",
    appraisalData: [
      {
        id: "9a",
        appraisalDate: new Date("2025-06-01T00:00:00Z"),
        lowerBound: "2600",
        upperBound: "4400",
        median: "3500",
        average: "3600",
        estimate: "3700",
      },
    ],
  },
  // (Continue for cards 10–25 using the same conversion pattern)
]

export default function Dashboard() {
  return (
    <div className="overflow-x-hidden">
      <Logo />
      <SettingsTab />
      <Charts />
      <Table tradingCards={tradingCards} />
    </div>
  )
}