import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FileEdit, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  barcode: z.string(),
  productName: z.string().min(1, "Product name is required"),
  sn: z.string(),
  model: z.string(),
  category: z.string().min(1, "Category is required"),
  salePrice: z.string().min(1, "Sale price is required"),
  unit: z.string().min(1, "Unit is required"),
  vat: z.string(),
  gts: z.string(),
  supplier: z.string(),
  supplierPrice: z.string(),
  details: z.string(),
})

export function ProductForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barcode: "",
      productName: "",
      sn: "",
      model: "",
      category: "",
      salePrice: "",
      unit: "",
      vat: "",
      gts: "",
      supplier: "",
      supplierPrice: "",
      details: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const clearFields = () => {
    form.reset({
      barcode: "",
      productName: "",
      sn: "",
      model: "",
      category: "",
      salePrice: "",
      unit: "",
      vat: "",
      gts: "",
      supplier: "",
      supplierPrice: "",
      details: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Add Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">Barcode/QR-code:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">Product name:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">Model:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">SN:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">Sale Price:</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">Category:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">VAT:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="number" {...field} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">%</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">Unit:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="piece">Piece</SelectItem>
                        <SelectItem value="kg">Kilogram</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">GTS:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="number" {...field} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">%</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-[2fr,1fr,auto]">
              <FormField
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Supplier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="supplier1">Supplier 1</SelectItem>
                        <SelectItem value="supplier2">Supplier 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supplierPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" defaultValue="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-1">
                <Button size="icon" variant="ghost">
                  <FileEdit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={clearFields}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900">Product Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Please enter the product in Detail" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-green-600 hover:bg-green-700 rounded-full transform hover:scale-110 transition-all duration-300 ">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
