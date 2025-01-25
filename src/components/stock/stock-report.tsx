
import { Copy, FileText, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stockData = [
  {
    id: "01",
    productName: "Copymate A4",
    model: "2424",
    salePrice: "1100Rs",
    purchasePrice: "900Rs",
    inQty: "900",
    outQty: "900",
    stock: "0",
    stockSalePrice: "0",
    stockPurchase: "0",
  },
  {
    id: "02",
    productName: "Dollar Ink",
    model: "2424",
    salePrice: "100Rs",
    purchasePrice: "70Rs",
    inQty: "700",
    outQty: "600",
    stock: "100",
    stockSalePrice: "10000Rs.",
    stockPurchase: "7000Rs.",
  },
  {
    id: "03",
    productName: "Double A",
    model: "2425",
    salePrice: "1000Rs",
    purchasePrice: "700Rs",
    inQty: "600",
    outQty: "600",
    stock: "0",
    stockSalePrice: "0",
    stockPurchase: "0",
  },
  {
    id: "04",
    productName: "Domicila cover",
    model: "2025",
    salePrice: "400Rs",
    purchasePrice: "300Rs",
    inQty: "350",
    outQty: "200",
    stock: "150",
    stockSalePrice: "60000Rs.",
    stockPurchase: "52000Rs.",
  },
  {
    id: "05",
    productName: "Photo paper",
    model: "2023",
    salePrice: "800Rs",
    purchasePrice: "600Rs",
    inQty: "400",
    outQty: "400",
    stock: "0",
    stockSalePrice: "0",
    stockPurchase: "0",
  },
]

export function StockReport() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-blue-900">Stock Report</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-full transform hover:scale-110 transition-all duration-300 ">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-full transform hover:scale-110 transition-all duration-300 ">
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-full transform hover:scale-110 transition-all duration-300 ">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs text-blue-900">SL.</TableHead>
                <TableHead className="text-xs text-blue-900">Product name</TableHead>
                <TableHead className="text-xs text-blue-900">Model</TableHead>
                <TableHead className="text-xs text-blue-900">Sale Price</TableHead>
                <TableHead className="text-xs text-blue-900"> Purchase Price</TableHead>
                <TableHead className="text-xs text-blue-900">In Qnty.</TableHead>
                <TableHead className="text-xs text-blue-900">Out Qnty.</TableHead>
                <TableHead className="text-xs text-blue-900">Stock</TableHead>
                <TableHead className="text-xs text-blue-900">Stock Sale Price</TableHead>
                <TableHead className="text-xs text-blue-900">Stock Purchase</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell className="text-red-500">{item.salePrice}</TableCell>
                  <TableCell className="text-green-500">{item.purchasePrice}</TableCell>
                  <TableCell>{item.inQty}</TableCell>
                  <TableCell>{item.outQty}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{item.stockSalePrice}</TableCell>
                  <TableCell>{item.stockPurchase}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={7} className="text-right font-bold text-blue-900">
                  Total
                </TableCell>
                <TableCell className="font-bold text-blue-900">250</TableCell>
                <TableCell className="font-bold text-green-500">70000Rs.</TableCell>
                <TableCell className="font-bold text-red-500">59000Rs.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

