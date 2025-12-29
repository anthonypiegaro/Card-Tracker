"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Feather } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SparklesCore } from "@/components/ui/sparkles"
import { Spinner } from "@/components/ui/spinner"

import { authClient } from "@/lib/auth-client"

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const signUpSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().min(1, "email is requried"),
  password: z.string().min(1, "password is required")
})

export type SignUpSchema = z.infer<typeof signUpSchema>

export default function Auth() {
  const [submitting, setIsSubmitting] = useState(false)
  const [signUpError, setSignUpError] = useState<string | null>(null)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: SignUpSchema) => {
    setIsSubmitting(true)
    const { data, error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL: "/auth"
    })
    if (error) {
      setSignUpError(error.message ?? "")
    } else {
      setSignUpError(null)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="w-dvw h-dvh flex flex-col justify-center items-center">
      <div className="">
        <Feather className="h-13 w-13 mb-3 mx-auto" />
        <div className="mb-4">
          <h2 className="text-xl font-medium leading-none">Welcome</h2>
          <p className="text-sm text-muted-foreground">Sign up to start tracking</p>
        </div>
        <Form {...form}>
          <form className="flex flex-col gap-y-4 mb-6">
            <FormField 
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className="w-65" {...field} disabled={submitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-65" {...field} disabled={submitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="w-65" {...field} disabled={submitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          {signUpError && <p className="text-sm text-destructive">{signUpError}</p>}
          <Button 
            className="w-full"
            type="button" 
            onClick={form.handleSubmit(onSubmit)}
          >
            {submitting && <Spinner />}
            {submitting ? "Signing up..." : "Sign Up"}
          </Button>
        </Form>
        <div className="mask-b-from-50% mask-l-from-70% mask-r-from-70% mask-t-from-90% relative w-65">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
          <div className="w-full h-full bg-background [mask-image:radial-gradient(50px_50px_at_top,transparent_20%,white)]" />
        </div>
      </div>
    </div>
  )
}