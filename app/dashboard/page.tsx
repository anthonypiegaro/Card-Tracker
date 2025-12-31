import { Charts } from "./charts/charts"
import { Logo } from "./logo"
import { SettingsTab } from "./settings-tab"

export default function Dashboard() {
  return (
    <div className="text-4xl">
      <Logo />
      <SettingsTab />
      <Charts />
    </div>
  )
}