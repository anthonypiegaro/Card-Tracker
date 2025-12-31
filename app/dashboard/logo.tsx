import { Feather } from "lucide-react"

export function Logo() {
  return (
    <div className="fixed top-5 left-2 md:left-5 p-2 rounded-md backdrop-blur-md flex items-center gap-x-2">
      <Feather className="w-5 h-5" />
      <div className="text-base font-medium dark:font-normal">Card Tracker</div>
    </div>
  )
}