"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { asc, eq } from "drizzle-orm"

import { db } from "@/db/db"
import { portfolioValuation } from "@/db/schema"
import { auth } from "@/lib/auth"

export const getPortfolioEvaluations = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  const portfolioValuations = await db
    .select({
      id: portfolioValuation.id,
      value: portfolioValuation.value,
      date: portfolioValuation.createdAt
    })
    .from(portfolioValuation)
    .where(eq(portfolioValuation.userId, userId))
    .orderBy(asc(portfolioValuation.createdAt))

  const portfolioValuationsCleaned = portfolioValuations.map(v => ({
    ...v,
    value: Number(portfolioValuation.value)
  }))

  return portfolioValuationsCleaned
}