


// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { FileEdit, ShoppingCart, Trash2 } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"

// const formSchema = z.object({
//   barcode: z.string(),
//   productName: z.string().min(1, "Product name is required"),
//   sn: z.string(),
//   model: z.string(),
//   category: z.string().min(1, "Category is required"),
//   salePrice: z.string().min(1, "Sale price is required"),
//   unit: z.string().min(1, "Unit is required"),
//   vat: z.string(),
//   gts: z.string(),
//   supplier: z.string(),
//   supplierPrice: z.string(),
//   details: z.string(),
// })

// export function ProductForm() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       barcode: "",
//       productName: "",
//       sn: "",
//       model: "",
//       category: "",
//       salePrice: "",
//       unit: "",
//       vat: "",
//       gts: "",
//       supplier: "",
//       supplierPrice: "",
//       details: "",
//     },
//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values)
//   }

//   const clearFields = () => {
//     form.reset({
//       barcode: "",
//       productName: "",
//       sn: "",
//       model: "",
//       category: "",
//       salePrice: "",
//       unit: "",
//       vat: "",
//       gts: "",
//       supplier: "",
//       supplierPrice: "",
//       details: "",
//     })
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-blue-900">Add Product</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid gap-4 md:grid-cols-2">
//               <FormField
//                 control={form.control}
//                 name="barcode"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-blue-900">Barcode/QR-code:</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="productName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-blue-900">Product name:</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="model"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-blue-900">Model:</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="sn"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-blue-900">SN:</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="salePrice"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-blue-900">Sale Price:</FormLabel>
//                     <FormControl>
//                       <Input type="number" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="category"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-blue-900">Category:</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="electronics">Electronics</SelectItem>
//                         <SelectItem value="clothing">Clothing</SelectItem>
//                         <SelectItem value="clothing">Stationery</SelectItem>
//                         <SelectItem value="clothing">Pipes</SelectItem>
//                         <SelectItem value="clothing">Toys</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="vat"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-blue-900">VAT:</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Input type="number" {...field} />
//                         <span className="absolute right-3 top-1/2 -translate-y-1/2">%</span>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="unit"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-blue-900">Unit:</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select unit" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="piece">Piece</SelectItem>
//                         <SelectItem value="kg">Kilogram</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="gts"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-blue-900">GTS:</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Input type="number" {...field} />
//                         <span className="absolute right-3 top-1/2 -translate-y-1/2">%</span>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid gap-4 md:grid-cols-[2fr,1fr,auto]">
//               <FormField
//                 control={form.control}
//                 name="supplier"
//                 render={({ field }) => (
//                   <FormItem>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Supplier" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="supplier1">Hameed</SelectItem>
//                         <SelectItem value="supplier2">Shabbir</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="supplierPrice"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input type="number" defaultValue="0.00" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex gap-1">
//                 <Button size="icon" variant="ghost">
//                   <FileEdit className="h-4 w-4" />
//                 </Button>
//                 <Button size="icon" variant="ghost" onClick={clearFields}>
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <FormField
//               control={form.control}
//               name="details"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-blue-900">Product Details</FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Please enter the product in Detail" className="min-h-[100px]" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="bg-green-600 hover:bg-green-700 rounded-full transform hover:scale-110 transition-all duration-300 ">
//               <ShoppingCart className="mr-2 h-4 w-4" />
//               Add Product
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   )
// }

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileEdit, ShoppingCart, Trash2 } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  barcode: z.string().optional(),
  productName: z.string().min(1, "Product name is required"),
  sn: z.string().optional(),
  model: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  salePrice: z.string().min(1, "Sale price is required"),
  unit: z.string().min(1, "Unit is required"),
  vat: z.string().optional(),
  gts: z.string().optional(),
  supplier: z.string().optional(),
  supplierPrice: z.string().optional(),
  details: z.string().optional(),
});

export function ProductForm() {
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setSubmitting(true);
      const response = await axios.post("http://localhost:5000/api/inventory", values);
      console.log("Product saved:", response.data);
      form.reset();
      alert("Product added successfully!");
      fetchProducts(); // Refresh the list after adding a new product
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product.");
    } finally {
      setSubmitting(false);
    }
  }

  const clearFields = () => {
    form.reset();
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Add Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Barcode */}
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

              {/* Product Name */}
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

              {/* Model */}
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

              {/* SN */}
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

              {/* Sale Price */}
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

              {/* Category */}
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
                        <SelectItem value="stationery">Stationery</SelectItem>
                        <SelectItem value="pipes">Pipes</SelectItem>
                        <SelectItem value="toys">Toys</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* VAT */}
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

              {/* Unit */}
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

              {/* GTS */}
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
              {/* Supplier */}
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
                        <SelectItem value="Hameed">Hameed</SelectItem>
                        <SelectItem value="Shabbir">Shabbir</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Supplier Price */}
              
              <FormField
                control={form.control}
                name="supplierPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">Supplier Price</FormLabel>
                    <FormControl>
                      
                      <Input type="number" defaultValue="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Edit/Delete Buttons */}
              <div className="flex gap-1">
                <Button size="icon" variant="ghost">
                  
                  <FileEdit className="h-4 w-4" />
                </Button>
                <Button type="button" size="icon" variant="ghost" onClick={clearFields}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Details */}
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

            <Button
              type="submit"
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700 rounded-full transform hover:scale-110 transition-all duration-300"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {submitting ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </Form>

        {/* Product Table */}
        <div className="mt-10">
        <div className="flex justify-end">
        <Button className="  bg-green-600 hover:bg-green-700 rounded-full transform hover:scale-110 transition-all duration-300">
         Saved Products
        </Button> 
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border-b p-2">Product Name</th>
            <th className="border-b p-2">Model</th>
            <th className="border-b p-2">Sale Price</th>
            <th className="border-b p-2">Category</th>
            <th className="border-b p-2">Unit</th>
            <th className="border-b p-2">Supplier</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="border-b p-2">{product.productName}</td>
              <td className="border-b p-2">{product.model}</td>
              <td className="border-b p-2">{product.salePrice}</td>
              <td className="border-b p-2">{product.category}</td>
              <td className="border-b p-2">{product.unit}</td>
              <td className="border-b p-2">{product.supplier}</td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>
        </div>
      </CardContent>
    </Card>
    </>

    
  );
}
