import { useEffect, useState } from "react"
import { Copy, FileText, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import jsPDF from 'jspdf';

export function StockReport() {
  type StockItem = {
    id: string
    productName: string
    model: string
    salePrice: string
    purchasePrice: string
    inQty: string
    outQty: string
    stock: string
    stockSalePrice: string
    stockPurchase: string
  }

  const [stockData, setStockData] = useState<StockItem[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/stock") // ✅ replace with your actual backend URL if needed
      .then((res) => res.json())
      .then((data) => {
        if (data && data.stock) {
          setStockData(data.stock)
        }
      })
      .catch((error) => console.error("Error fetching stock data:", error))
  }, [])

  // Function to copy content to clipboard
  const handleCopy = () => {
    const tableContent = document.getElementById('stock-table')?.innerText;
    if (tableContent) {
      navigator.clipboard.writeText(tableContent);
    }
  }

  // Function to download the PDF manually with proper spacing
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add a title for the report
    doc.setFontSize(18);
    doc.text("Stock Report", 14, 20);

    // Set up the table headers
    const headers = [
      'SL.',
      'Product name',
      'Model',
      'Sale Price',
      'Purchase Price',
      'In Qnty.',
      'Out Qnty.',
      'Stock',
      'Stock Sale Price',
      'Stock Purchase'
    ];

    let yOffset = 30; // Vertical offset to position table
    const rowHeight = 10;
    const columnWidths = [30, 60, 50, 45, 50, 35, 35, 35, 40, 40]; // Increased widths for more spacing

    // Print headers
    headers.forEach((header, index) => {
      doc.text(header, 14 + columnWidths.slice(0, index).reduce((acc, width) => acc + width, 0), yOffset);
    });

    yOffset += rowHeight;

    // Print table rows
    stockData.forEach((item, index) => {
      const row = [
        index + 1,
        item.productName,
        item.model,
        item.salePrice,
        item.purchasePrice,
        item.inQty,
        item.outQty,
        item.stock,
        item.stockSalePrice,
        item.stockPurchase,
      ];

      row.forEach((cell, index) => {
        doc.text(String(cell), 14 + columnWidths.slice(0, index).reduce((acc, width) => acc + width, 0), yOffset);
      });

      yOffset += rowHeight;
    });

    doc.save('StockReport.pdf');
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-blue-900">Stock Report</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-full transform hover:scale-110 transition-all duration-300"
            onClick={handleCopy}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button
            variant="outline"
            className="bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-full transform hover:scale-110 transition-all duration-300"
            onClick={handleDownloadPDF}
          >
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button
            variant="outline"
            className="bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-full transform hover:scale-110 transition-all duration-300"
            onClick={() => window.print()}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table id="stock-table">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs text-blue-900">SL.</TableHead>
                <TableHead className="text-xs text-blue-900">Product name</TableHead>
                <TableHead className="text-xs text-blue-900">Model</TableHead>
                <TableHead className="text-xs text-blue-900">Sale Price</TableHead>
                <TableHead className="text-xs text-blue-900">Purchase Price</TableHead>
                <TableHead className="text-xs text-blue-900">In Qnty.</TableHead>
                <TableHead className="text-xs text-blue-900">Out Qnty.</TableHead>
                <TableHead className="text-xs text-blue-900">Stock</TableHead>
                <TableHead className="text-xs text-blue-900">Stock Sale Price</TableHead>
                <TableHead className="text-xs text-blue-900">Stock Purchase</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
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
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}




// import { useEffect, useState } from "react"
// import { Copy, FileText, Printer } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// export function StockReport() {
//   type StockItem = {
//     id: string
//     productName: string
//     model: string
//     salePrice: string
//     purchasePrice: string
//     inQty: string
//     outQty: string
//     stock: string
//     stockSalePrice: string
//     stockPurchase: string
//   }


//   const [stockData, setStockData] = useState<StockItem[]>([])

//   useEffect(() => {
//     fetch("http://localhost:5000/api/stock") // ✅ replace with your actual backend URL if needed
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.stock) {
//           setStockData(data.stock)
//         }
//       })
//       .catch((error) => console.error("Error fetching stock data:", error))
//   }, [])

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-blue-900">Stock Report</CardTitle>
//         <div className="flex gap-2">
//           <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-full transform hover:scale-110 transition-all duration-300">
//             <Copy className="mr-2 h-4 w-4" />
//             Copy
//           </Button>
//           <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-full transform hover:scale-110 transition-all duration-300">
//             <FileText className="mr-2 h-4 w-4" />
//             PDF
//           </Button>
//           <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-full transform hover:scale-110 transition-all duration-300">
//             <Printer className="mr-2 h-4 w-4" />
//             Print
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="text-xs text-blue-900">SL.</TableHead>
//                 <TableHead className="text-xs text-blue-900">Product name</TableHead>
//                 <TableHead className="text-xs text-blue-900">Model</TableHead>
//                 <TableHead className="text-xs text-blue-900">Sale Price</TableHead>
//                 <TableHead className="text-xs text-blue-900"> Purchase Price</TableHead>
//                 <TableHead className="text-xs text-blue-900">In Qnty.</TableHead>
//                 <TableHead className="text-xs text-blue-900">Out Qnty.</TableHead>
//                 <TableHead className="text-xs text-blue-900">Stock</TableHead>
//                 <TableHead className="text-xs text-blue-900">Stock Sale Price</TableHead>
//                 <TableHead className="text-xs text-blue-900">Stock Purchase</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {stockData.map((item, index) => (
//                 <TableRow key={item.id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{item.productName}</TableCell>
//                   <TableCell>{item.model}</TableCell>
//                   <TableCell className="text-red-500">{item.salePrice}</TableCell>
//                   <TableCell className="text-green-500">{item.purchasePrice}</TableCell>
//                   <TableCell>{item.inQty}</TableCell>
//                   <TableCell>{item.outQty}</TableCell>
//                   <TableCell>{item.stock}</TableCell>
//                   <TableCell>{item.stockSalePrice}</TableCell>
//                   <TableCell>{item.stockPurchase}</TableCell>
//                 </TableRow>
//               ))}
//               {/* You can add logic for totals here if needed */}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }


