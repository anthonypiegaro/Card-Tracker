"use client"

import { useRouter } from "next/navigation"
import { User } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export function SignOutButton() {
  const router = useRouter()

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth")
        }
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer text-foreground/80 dark:text-foreground relative flex items-center justify-center transition-all duration-300 rounded-md hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-accent/50 p-1"
        >
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem 
          variant="destructive" 
          className="cursor-pointer"
          onClick={signOut}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}