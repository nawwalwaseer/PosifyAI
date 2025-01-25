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

const transactions = [
  {
    date: "09/09/24",
    description: "Awais (MUX retailer)",
    voucherNo: "0420",
    debit: "0 RS",
    credit: "5000 RS",
    balance: "5000 RS",
  },
  {
    date: "09/09/24",
    description: "Moosa (ISL retailer)",
    voucherNo: "0110",
    debit: "15000 RS",
    credit: "0 RS",
    balance: "15000 RS",
  },
]

export function SupplierLedger() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-blue-900">Customer Ledger</CardTitle>
        <Button variant="outline" className="w-[200px]  px-4 py-2 text-lg bg-green-600 hover:bg-green-700 text-white hover:text-white rounded-full transform hover:scale-110 transition-all duration-300 ">Manage Supplier</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-900">Date</TableHead>
              <TableHead className="text-blue-900">Description</TableHead>
              <TableHead className="text-blue-900">Voucher no.</TableHead>
              <TableHead className="text-blue-900">Debit</TableHead>
              <TableHead className="text-blue-900">Credit</TableHead>
              <TableHead className="text-blue-900">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.voucherNo}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.voucherNo}</TableCell>
                <TableCell>{transaction.debit}</TableCell>
                <TableCell>{transaction.credit}</TableCell>
                <TableCell>{transaction.balance}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="font-bold text-blue-900">
                Grand Total
              </TableCell>
              <TableCell className="font-bold">15000 RS</TableCell>
              <TableCell className="font-bold">5,000 RS</TableCell>
              <TableCell className="font-bold text-blue-900">20,000 RS</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

