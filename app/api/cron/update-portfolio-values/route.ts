import { NextResponse } from "next/server"
import { sql } from "drizzle-orm"

import { db } from "@/db/db"

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    /* 
      Logic Breakdown:
      1. We need the LATEST appraisal for every card.
      2. We multiply that appraisal's estimate by the card quantity.
      3. We group by User ID.
      4. We insert the result into the portfolio_evaluation table.
    */

    // NOTE: This uses Raw SQL for performance. 
    // If table names ('appraisal', 'card', 'portfolio_evaluation') change in schema.ts,
    // this query must be updated manually. 
    await db.execute(sql`
      WITH latest_appraisals AS (
        SELECT DISTINCT ON (card_id) 
          card_id, 
          estimate
        FROM appraisal
        ORDER BY card_id, appraisal_date DESC
      ),
      user_totals AS (
        SELECT 
          c.user_id,
          SUM(la.estimate * c.quantity) as total_value
        FROM card c
        INNER JOIN latest_appraisals la ON c.id = la.card_id
        GROUP BY c.user_id
      )
      INSERT INTO portfolio_evaluation (user_id, value, created_at, updated_at)
      SELECT 
        user_id, 
        total_value, 
        NOW(), 
        NOW()
      FROM user_totals
    `)

    return NextResponse.json({ success: true, message: "Portfolios updated" })
  } catch (error) {
    console.error("Cron job failed:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}