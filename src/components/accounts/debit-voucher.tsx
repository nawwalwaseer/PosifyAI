
import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DebitRow {
  id: number
  accountName: string
  code: string
  amount: string
}

const formSchema = z.object({
  voucherNumber: z.string().min(1, "Voucher number is required"),
  creditAccountHead: z.string().min(1, "Credit account head is required"),
  date: z.string().min(1, "Date is required"),
  remark: z.string(),
})

export function DebitVoucher() {
  const [debitRows, setDebitRows] = useState<DebitRow[]>([{ id: 1, accountName: "", code: "", amount: "" }])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucherNumber: "",
      creditAccountHead: "",
      date: "",
      remark: "",
    },
  })

  const addRow = () => {
    setDebitRows([...debitRows, { id: debitRows.length + 1, accountName: "", code: "", amount: "" }])
  }

  const removeRow = (id: number) => {
    if (debitRows.length > 1) {
      setDebitRows(debitRows.filter((row) => row.id !== id))
    }
  }

  const updateRow = (id: number, field: keyof DebitRow, value: string) => {
    setDebitRows(debitRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  const calculateTotal = () => {
    return debitRows.reduce((sum, row) => sum + (Number.parseFloat(row.amount) || 0), 0).toFixed(2)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Debit Voucher</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="space-y-4">
              {debitRows.map((row) => (
                <div key={row.id} className="flex gap-2">
                  <Select value={row.accountName} onValueChange={(value) => updateRow(row.id, "accountName", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Account Name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account1">Account 1</SelectItem>
                      <SelectItem value="account2">Account 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Code"
                    value={row.code}
                    onChange={(e) => updateRow(row.id, "code", e.target.value)}
                    className="w-[120px]"
                  />
                  <Input
                    placeholder="Amount"
                    type="number"
                    value={row.amount}
                    onChange={(e) => updateRow(row.id, "amount", e.target.value)}
                    className="w-[150px]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(row.id)}
                    disabled={debitRows.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={addRow} className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Total:</span>
                  <Input value={calculateTotal()} readOnly className="w-[150px]" />
                </div>
              </div>
            </div>
          </div>

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
                name="creditAccountHead"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Credit Account Head" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="date" {...field} />
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
              <Button type="submit" className=" w-20 px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300 ">
                Save
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}

