import { useEffect, useState } from "react"
import { FileEdit, Trash2, Copy } from "lucide-react" // Import the Copy icon
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"

export function PurchaseTable() {
  const [purchases, setPurchases] = useState<any[]>([])

  // Fetch purchase data from the backend
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/purchases")
        setPurchases(response.data)
      } catch (error) {
        console.error("Error fetching purchase data:", error)
      }
    }

    fetchPurchases()
  }, [])

  // Safely calculate the total amount (including discount)
  const calculateTotalAmount = (purchase: any) => {
    const totalAmount = parseFloat(purchase.total.toString()) // Ensure it's a number
    const discount = parseFloat(purchase.discount.toString()) // Ensure it's a number
    return totalAmount - discount
  }

  // Function to format the date
  const formatDate = (date: string) => {
    const formattedDate = new Date(date)
    if (isNaN(formattedDate.getTime())) {
      return "Invalid Date"
    }
    return formattedDate.toLocaleDateString() // Format as per your locale
  }

  // Function to join items (if items is an array)
  const formatItems = (items: any) => {
    if (Array.isArray(items)) {
      return items.map((item: any) => item.productName || item.toString()).join(", ") // Join item names
    }
    return items.toString()
  }

  // Function to copy purchase data to clipboard
  const copyToClipboard = (purchase: any) => {
    const purchaseDetails = `  
      Supplier: ${purchase.supplier}
      Date: ${formatDate(purchase.date)}
      Invoice No: ${purchase.invoiceNo}
      Items: ${formatItems(purchase.items)}
      Total: ${purchase.total} RS
      Discount: ${purchase.discount} RS
      Due Amount: ${purchase.dueAmount} RS
      Paid Amount: ${purchase.paidAmount} RS
    `
    navigator.clipboard.writeText(purchaseDetails)
      .then(() => {
        alert("Purchase details copied to clipboard!")
      })
      .catch((err) => {
        console.error("Error copying text: ", err)
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Manage Purchases</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-900">SL.</TableHead>
              <TableHead className="text-blue-900">Supplier</TableHead>
              <TableHead className="text-blue-900">Date</TableHead>
              <TableHead className="text-blue-900">Invoice No</TableHead>
              <TableHead className="text-blue-900">Item</TableHead>
              <TableHead className="text-blue-900">Total</TableHead>
              <TableHead className="text-blue-900">Discount</TableHead>
              <TableHead className="text-blue-900">Due Amount</TableHead>
              <TableHead className="text-blue-900">Paid Amount</TableHead>
              <TableHead className="text-blue-900">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase, index) => (
              <TableRow key={purchase._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{purchase.supplier}</TableCell>
                <TableCell>{formatDate(purchase.date)}</TableCell>
                <TableCell>{purchase.invoiceNo}</TableCell>
                <TableCell>{formatItems(purchase.items)}</TableCell>
                <TableCell>{purchase.total} RS</TableCell>
                <TableCell>{purchase.discount} RS</TableCell>
                <TableCell>{purchase.dueAmount} RS</TableCell>
                <TableCell>{purchase.paidAmount} RS</TableCell>
                <TableCell>
                  <div className="flex gap-1">

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard(purchase)} // Add the onClick event for copy
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={8} className="text-right font-bold text-blue-900">
                Total Due Amount
              </TableCell>
              <TableCell colSpan={2} className="font-bold text-red-500">
                {purchases
                  .reduce((sum, purchase) => sum + purchase.dueAmount, 0) // Sum the dueAmount instead of total
                  .toFixed(2)}{" "}
                RS
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}





// import { FileEdit, Trash2 } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// const purchases = [
//   {
//     id: "01",
//     invoiceNo: "0010",
//     purchaseId: "01000",
//     supplierName: "Awais",
//     purchaseDate: "09/09/24",
//     totalAmount: "5000 RS",
//   },
//   {
//     id: "02",
//     invoiceNo: "1010",
//     purchaseId: "01000",
//     supplierName: "Hamid",
//     purchaseDate: "09/09/24",
//     totalAmount: "5000 RS",
//   },
// ]

// export function PurchaseTable() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className='text-blue-900'>Manage purchase</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className='text-blue-900'>SL.</TableHead>
//               <TableHead className='text-blue-900'>Invoice No</TableHead>
//               <TableHead className='text-blue-900'>Purchase id</TableHead>
//               <TableHead className='text-blue-900'>Supplier Name</TableHead>
//               <TableHead className='text-blue-900'>Purchase Date</TableHead>
//               <TableHead className='text-blue-900'>Total Amount</TableHead>
//               <TableHead className='text-blue-900'>Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {purchases.map((purchase) => (
//               <TableRow key={purchase.id}>
//                 <TableCell>{purchase.id}</TableCell>
//                 <TableCell>{purchase.invoiceNo}</TableCell>
//                 <TableCell>{purchase.purchaseId}</TableCell>
//                 <TableCell>{purchase.supplierName}</TableCell>
//                 <TableCell>{purchase.purchaseDate}</TableCell>
//                 <TableCell>{purchase.totalAmount}</TableCell>
//                 <TableCell>
//                   <div className="flex gap-1">
//                     <Button size="icon" variant="ghost">
//                       <FileEdit className="h-4 w-4" />
//                     </Button>
//                     <Button size="icon" variant="ghost">
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell colSpan={5} className="text-right font-bold text-blue-900">
//                 Total Amount
//               </TableCell>
//               <TableCell colSpan={2} className="font-bold text-red-500">
//                 10,000 RS
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }

