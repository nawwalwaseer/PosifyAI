// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// const formSchema = z.object({
//   firstName: z.string().min(2, "First name is required"),
//   lastName: z.string().min(2, "Last name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   confirmPassword: z.string(),
//   address: z.string().min(1, "Address is required"),
//   address2: z.string().optional(),
//   city: z.string().min(1, "City is required"),
//   region: z.string().min(1, "Region is required"),
//   postalCode: z.string().min(1, "Postal code is required"),
//   country: z.string().min(1, "Country is required"),
//   businessName: z.string().min(1, "Business name is required"),
//   category: z.string().min(1, "Category is required"),
//   phone: z.string().min(1, "Phone number is required"),
//   cardName: z.string().min(1, "Card name is required"),
//   cardNumber: z.string().min(1, "Card number is required"),
//   expiryDate: z.string().min(1, "Expiry date is required"),
//   cvv: z.string().min(1, "CVV is required"),
//   terms: z.boolean().refine((val) => val === true, {
//     message: "You must accept the terms and conditions",
//   }),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// })

// const categories = [
//   "Retail",
//   "Restaurant",
//   "Service",
//   "Healthcare",
//   "Education",
//   "Manufacturing",
//   "Other",
// ]

// export function SignUpForm() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       address: "",
//       address2: "",
//       city: "",
//       region: "",
//       postalCode: "",
//       country: "",
//       businessName: "",
//       category: "",
//       phone: "",
//       cardName: "",
//       cardNumber: "",
//       expiryDate: "",
//       cvv: "",
//       terms: false,
//     },
//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values)
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         {/* ...other components remain unchanged... */}
//         <div className="space-y-4">
//           <FormField
//             control={form.control}
//             name="terms"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                 <FormControl>
//                   <Checkbox
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FormControl>
//                 <div className="text-sm leading-none">
//                   By checking this box, you agree to the{" "}
//                   <a href="#" className="text-blue-600 hover:underline">
//                     purchase conditions
//                   </a>{" "}
//                   and the{" "}
//                   <a href="#" className="text-blue-600 hover:underline">
//                     Privacy Policy
//                   </a>
//                   .
//                 </div>
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
//             Submit Data
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }
