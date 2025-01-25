
import { Copy, FileEdit, Printer, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const vouchers = [
  {
    id: "01",
    voucherNo: "CR2145",
    date: "12/1/25",
    remark: "Stock",
    debit: "10,000,000 Rs",
    credit: "0 Rs",
  },
  {
    id: "02",
    voucherNo: "CQ2145",
    date: "12/1/25",
    remark: "Stock",
    debit: "0 Rs",
    credit: "20,000,000 Rs",
  },
  {
    id: "03",
    voucherNo: "CQ220M",
    date: "12/1/25",
    remark: "Stock",
    debit: "12,000,000 Rs",
    credit: "0 Rs",
  },
]

export function VoucherApproval() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-0 pt-0">
        <CardTitle>Voucher Approval</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" className="px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300">
            Expand
          </Button>
          <Button variant="outline" className="px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" className="px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300">
            PDF
          </Button>
          <Button variant="outline" className="px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL.</TableHead>
              <TableHead>Voucher no.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Remark</TableHead>
              <TableHead>Debit</TableHead>
              <TableHead>Credit</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vouchers.map((voucher) => (
              <TableRow key={voucher.id}>
                <TableCell>{voucher.id}</TableCell>
                <TableCell>{voucher.voucherNo}</TableCell>
                <TableCell>{voucher.date}</TableCell>
                <TableCell>{voucher.remark}</TableCell>
                <TableCell className="text-red-500">{voucher.debit}</TableCell>
                <TableCell className="text-green-500">{voucher.credit}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                      Approved
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

