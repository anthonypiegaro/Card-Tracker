import { SignInButton } from "@/components/sign-in-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"

export default function Home() {
  return (
    <div className="w-dvw h-dvh w-full">
      <div className="relative w-fit flex flex-col items-center my-12 p-4 mx-auto p-2">
        <DottedGlowBackground
          className="pointer-events-none mask-radial-to-80% mask-radial-at-center opacity-20 dark:opacity-100 w-full"
          opacity={1}
          gap={10}
          radius={1.6}
          colorLightVar="--color-neutral-500"
          glowColorLightVar="--color-neutral-900"
          colorDarkVar="--color-neutral-500"
          glowColorDarkVar="--color-sky-800"
          backgroundOpacity={0}
          speedMin={0.3}
          speedMax={1.6}
          speedScale={1}
        />
        <h1 className="z-100 text-center text-5xl lg:text-7xl font-bold mb-2 lg:mb-4">
          Card Tracker
        </h1>
        <p className="z-100 text-center text-xl font-medium lg:text-2xl max-w-2xl mb-4">
          Track your collection, stay organized, and get real‑time pricing for every card you own.
        </p>
        <div className="flex gap-x-2">
          <SignInButton />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
