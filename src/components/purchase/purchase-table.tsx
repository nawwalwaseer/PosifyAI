
import { FileEdit, Trash2 } from 'lucide-react'
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

const purchases = [
  {
    id: "01",
    invoiceNo: "0010",
    purchaseId: "01000",
    supplierName: "Awais",
    purchaseDate: "09/09/24",
    totalAmount: "5000 RS",
  },
  {
    id: "02",
    invoiceNo: "1010",
    purchaseId: "01000",
    supplierName: "Hamid",
    purchaseDate: "09/09/24",
    totalAmount: "5000 RS",
  },
]

export function PurchaseTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-blue-900'>Manage purchase</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-blue-900'>SL.</TableHead>
              <TableHead className='text-blue-900'>Invoice No</TableHead>
              <TableHead className='text-blue-900'>Purchase id</TableHead>
              <TableHead className='text-blue-900'>Supplier Name</TableHead>
              <TableHead className='text-blue-900'>Purchase Date</TableHead>
              <TableHead className='text-blue-900'>Total Amount</TableHead>
              <TableHead className='text-blue-900'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.id}</TableCell>
                <TableCell>{purchase.invoiceNo}</TableCell>
                <TableCell>{purchase.purchaseId}</TableCell>
                <TableCell>{purchase.supplierName}</TableCell>
                <TableCell>{purchase.purchaseDate}</TableCell>
                <TableCell>{purchase.totalAmount}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} className="text-right font-bold text-blue-900">
                Total Amount
              </TableCell>
              <TableCell colSpan={2} className="font-bold text-red-500">
                10,000 RS
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

