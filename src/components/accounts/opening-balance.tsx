
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  voucherNumber: z.string().min(1, "Voucher number is required"),
  accountHead: z.string().min(1, "Account head is required"),
  account: z.string().min(1, "Account is required"),
  remark: z.string(),
})

export function OpeningBalance() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucherNumber: "",
      accountHead: "",
      account: "",
      remark: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-900">Opening Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="voucherNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Voucher Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountHead"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Account Head" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Account" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Remark" className="min-h-[100px] resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-24  px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-full transform hover:scale-110 transition-all duration-300">
              
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

