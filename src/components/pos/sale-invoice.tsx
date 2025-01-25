import { useState } from "react"
import { X } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ProductRow {
  id: string
  code: string
  name: string
  qty: number
  price: number
  discPc: number
  discPercent: number
  discVal: number
  sc: number
  amount: number
}

interface SaleInvoiceProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SaleInvoice({ open, onOpenChange }: SaleInvoiceProps) {
  const [products, setProducts] = useState<ProductRow[]>([
    {
      id: "1",
      code: "",
      name: "",
      qty: 0,
      price: 0,
      discPc: 0,
      discPercent: 0,
      discVal: 0,
      sc: 0,
      amount: 0,
    },
  ])

  const [billDisc, setBillDisc] = useState(0)
  const [salesTax, setSalesTax] = useState(0)
  const [serviceCh, setServiceCh] = useState(0)
  const [withholdingTax, setWithholdingTax] = useState(0)
  const [extraSaleTax, setExtraSaleTax] = useState(0)

  const calculateTotals = () => {
    const totalItems = products.length
    const totalQty = products.reduce((sum, p) => sum + p.qty, 0)
    const totalAmount = products.reduce((sum, p) => sum + p.amount, 0)
    const totalDiscount = products.reduce((sum, p) => sum + p.discVal, 0)
    const netAmount = totalAmount - totalDiscount

    return {
      totalItems,
      totalQty,
      totalAmount,
      totalDiscount,
      netAmount,
    }
  }

  const totals = calculateTotals()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
      <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  <DialogTitle className="text-xl font-bold text-blue-900 ">Sale Invoice (POS)</DialogTitle>
  <Link to="/dashboard">
    <button className="text-black hover:text-red-500 transition-all duration-300">
      <X className="h-6 w-6" />
    </button>
  </Link>
</DialogHeader>


        <div className="space-y-4">
          {/* Last Bill Number */}
          <div className="text-sm font-medium">Last Bill no. 09896</div>

          {/* Invoice Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid grid-cols-[1fr,2fr] gap-4">
              <Input placeholder="Bill ID" />
              <Input type="date" />
            </div>
            <div className="grid grid-cols-[1fr,2fr] gap-4">
              <Input placeholder="Store ID" />
              <Input placeholder="Store Name" />
            </div>
          </div>

          <div className="grid grid-cols-[1fr,2fr] gap-4">
            <Input placeholder="Organisation ID" />
            <Input placeholder="Organisation Name" />
          </div>

          {/* Product Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-[100px]">Code</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="w-[80px]">Qty</TableHead>
                  <TableHead className="w-[100px]">Price</TableHead>
                  <TableHead className="w-[100px]">Disc/PC</TableHead>
                  <TableHead className="w-[80px]">Disc%</TableHead>
                  <TableHead className="w-[100px]">Disc Val</TableHead>
                  <TableHead className="w-[80px]">SC</TableHead>
                  <TableHead className="w-[100px]">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Input className="h-8 " />
                    </TableCell>
                    <TableCell>
                      <Input className="h-8" />
                    </TableCell>
                    <TableCell>
                      <Input className="h-8" type="number" />
                    </TableCell>
                    <TableCell>
                      <Input className="h-8" type="number" />
                    </TableCell>
                    <TableCell>
                      <Input className="h-8" type="number" />
                    </TableCell>
                    <TableCell>
                      <Input className="h-8" type="number" />
                    </TableCell>
                    <TableCell>
                      <Input className="h-8" type="number" />
                    </TableCell>
                    <TableCell>
                      <Input className="h-8" type="number" />
                    </TableCell>
                    <TableCell>
                      <Input className="h-8" type="number" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-[2fr,3fr] gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm ">Bill.Discount</span>
                <Input
                  placeholder="Bill Disc"
                  type="number"
                  value={billDisc}
                  onChange={(e) => setBillDisc(Number(e.target.value))}
                />
                <span className="w-12">(%)</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm " >Sales.Tax</p>
                <Input
                  placeholder="Sales Tax"
                  type="number"
                  value={salesTax}
                  onChange={(e) => setSalesTax(Number(e.target.value))}
                />
                <span className="w-12">(%)</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm ">Service.Tax</p>
                <Input
                  placeholder="Service Ch"
                  type="number"
                  value={serviceCh}
                  onChange={(e) => setServiceCh(Number(e.target.value))}
                />
                <span className="w-12">(%)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-xs">Total Items</div>
                  <div className="rounded bg-black px-4 py-2 font-mono text-2xl text-white">
                    {totals.totalItems.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs">Total Qty</div>
                  <div className="rounded bg-green-500 px-4 py-2 font-mono text-2xl text-white">
                    {totals.totalQty.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs">Total Amount</div>
                  <div className="rounded bg-yellow-500 px-4 py-2 font-mono text-2xl text-white">
                    {totals.totalAmount.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs">Total Discount</div>
                  <div className="rounded bg-red-500 px-4 py-2 font-mono text-2xl text-white">
                    {totals.totalDiscount.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs">Net Amount</div>
                  <div className="rounded bg-blue-500 px-4 py-2 font-mono text-2xl text-white">
                    {totals.netAmount.toString().padStart(2, "0")}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 ">
                  
                  <p className="text-sm ">WithHolding.Tax</p>
                  
                  <Input
                    placeholder="Withholding Tax"
                    type="number"
                    value={withholdingTax}
                    onChange={(e) => setWithholdingTax(Number(e.target.value))}
                  />
                  <span className="w-12">(%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm ">ExtraSales.Tax</p>
                  <Input
                    placeholder="Extra Sale Tax"
                    type="number"
                    value={extraSaleTax}
                    onChange={(e) => setExtraSaleTax(Number(e.target.value))}
                  />
                  <span className="w-12">(%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button className="bg-green-500 hover:bg-green-600">Print</Button>
            <Button className="bg-blue-500 hover:bg-blue-600">Open</Button>
            <Button className="bg-red-500 hover:bg-red-600">Clear</Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600">Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  
  )
}

