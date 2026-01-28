"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

import { addCard } from "../add-card"
import { TradingCard } from "../types"

export const tradingCardSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name is required"),
  notes: z.string(),
  quantity: z.int().nonnegative()
})

export type TradingCardSchema = z.infer<typeof tradingCardSchema>

export function CreateNewCardDialog({
  open,
  onOpenChange,
  onSuccess
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (tradingCard: TradingCard) => void
}) {
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<TradingCardSchema>({
    resolver: zodResolver(tradingCardSchema),
    defaultValues: {
      id: uuidv4(),
      name: "",
      notes: "",
      quantity: 1
    }
  })

  const handleOpenChange = (open: boolean) => {
    form.reset({
      id: uuidv4(),
      name: "",
      notes: "",
      quantity: 1
    })

    onOpenChange(open)
  }

  const onSubmit = async (values: TradingCardSchema) => {
    setSubmitting(true)

    await addCard(values)
      .then(data => {
        toast.success("Success", {
          description: `${values.name} has been added to your portfolio`
        })
        onSuccess(data)
        handleOpenChange(false)
      })
      .catch(e => {
        toast.error("Error", {
          description: e.message
        })
      })

    setSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add New Card
          </DialogTitle>
          <DialogDescription>
            Fill out the details to add the card to your portfolio.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form className="flex flex-col gap-y-4">
              <FormField 
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormDescription>[Year] [Brand] [Player Name] [Card Number]</FormDescription>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="2020 Topps Chrome Ronald Acuña Jr. #100" 
                        {...field} 
                        disabled={submitting} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                name="quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        disabled={submitting} 
                        onChange={event => field.onChange(event.target.value === "" ? "" : +event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                name="notes"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="w-full max-w-full min-w-0 h-50 resize-none mb-2 whitespace-pre-wrap break-words text-muted-foreground focus:text-primary"
                        {...field}
                        disabled={submitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={submitting}
                  onClick={() => handleOpenChange(false)}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  className="cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Spinner />
                      Adding card..
                    </>
                  ) : "Add card"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}