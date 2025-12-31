import { Charts } from "./charts/charts"
import { Logo } from "./logo"
import { SettingsTab } from "./settings-tab"

export default function Dashboard() {
  return (
    <div className="w-dvw h-dvh text-4xl scrollbar-hidden">
      <Logo />
      <SettingsTab />
      <Charts />
    </div>
  )
}