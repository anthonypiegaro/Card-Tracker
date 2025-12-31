"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export function SignInButton() {
  const session = authClient.useSession()

  if (session) {
    return (
      <Button className="cursor-pointer z-100 mb-4">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    )
  }

  return (
    <Button className="cursor-pointer z-100 mb-4" asChild>
      <Link href="/auth">Sign In</Link>
    </Button>
  )
}