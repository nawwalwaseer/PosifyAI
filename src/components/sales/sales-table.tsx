
import { Eye, FileEdit, Printer, Trash2 } from 'lucide-react'
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

const sales = [
  {
    id: "01",
    invoiceNo: "0010",
    salesBy: "Arham",
    customerName: "Mishba",
    date: "09/09/24",
    totalAmount: "5000 RS",
  },
  {
    id: "02",
    invoiceNo: "0110",
    salesBy: "Hameel",
    customerName: "Hassaan",
    date: "09/10/24",
    totalAmount: "15000 RS",
  },
  {
    id: "03",
    invoiceNo: "0114",
    salesBy: "Arham",
    customerName: "Jasid",
    date: "07/10/24",
    totalAmount: "5000 RS",
  },
]

export function SalesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-blue-900'>Manage Sale</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-blue-900 text-center'>SL</TableHead>
              <TableHead className=' text-blue-900 text-center'>Invoice No</TableHead>
              <TableHead className='text-blue-900 text-center'>Sales By</TableHead>
              <TableHead className='text-blue-900 text-center'>Customer Name</TableHead>
              <TableHead className='text-blue-900 text-center'>Date</TableHead>
              <TableHead className='text-blue-900 text-center'>Total.Amount</TableHead>
              <TableHead className='text-blue-900 text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.invoiceNo}</TableCell>
                <TableCell>{sale.salesBy}</TableCell>
                <TableCell>{sale.customerName}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>{sale.totalAmount}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <p className="font-semibold text-blue-900">Total Amount: <span className="text-black">25,000 RS</span></p>
        </div>
      </CardContent>
    </Card>
  )
}

