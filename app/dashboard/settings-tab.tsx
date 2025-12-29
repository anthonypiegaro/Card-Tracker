"use client"

import { SignOutButton } from "@/components/sign-out-button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SettingsTab() {
  return (
    <div className="fixed top-5 right-5 flex items-center border rounded-md">
      <SignOutButton />
      <ThemeToggle />
    </div>
  )
}