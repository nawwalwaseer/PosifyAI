import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProductRow {
  id: string;
  code: string;
  name: string;
  qty: number;
  price: number;
  discVal: number; // percentage
  sc: number;
  amount: number;
}

interface SaleInvoiceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaleInvoice({ open, onOpenChange }: SaleInvoiceProps) {

  const [billId, setBillId] = useState("");
  const [storeId, setStoreId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [orgId, setOrgId] = useState("");
  const [orgName, setOrgName] = useState("");



  const [products, setProducts] = useState<ProductRow[]>([
    {
      id: "1",
      code: "",
      name: "",
      qty: 0,
      price: 0,
      discVal: 0,
      sc: 0,
      amount: 0,
    },
  ]);

  const [serviceTax, setServiceTax] = useState(0);
  const [withholdingTax, setWithholdingTax] = useState(0);
  const [extraSaleTax, setExtraSaleTax] = useState(0);

  const calculateTotals = () => {
    const totalItems = products.length;
    const totalQty = products.reduce((sum, p) => sum + p.qty, 0);

    const totalRawAmount = products.reduce((sum, p) => sum + (p.price * p.qty), 0);
    const totalDiscount = products.reduce((sum, p) => sum + ((p.price * p.qty) * (p.discVal / 100)), 0);

    const discountedAmount = totalRawAmount - totalDiscount;

    const serviceTaxAmount = (discountedAmount * serviceTax) / 100;
    const withholdingTaxAmount = (discountedAmount * withholdingTax) / 100;
    const extraSalesTaxAmount = (discountedAmount * extraSaleTax) / 100;

    const netAmount =
      discountedAmount +
      serviceTaxAmount +
      withholdingTaxAmount +
      extraSalesTaxAmount;

    return {
      totalItems,
      totalQty,
      totalAmount: totalRawAmount,
      totalDiscount,
      netAmount,
    };
  };

  const handleProductChange = (index: number, field: keyof ProductRow, value: any) => {
    // Prevent negative values for specific fields
    if (
      (field === "qty" || field === "price" || field === "discVal" || field === "sc") &&
      Number(value) < 0
    ) {
      return; // Exit early if a negative number is attempted
    }
  
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
  
    if (field === "qty" || field === "price" || field === "discVal") {
      const product = updatedProducts[index];
      const raw = product.qty * product.price;
      const discountAmount = (raw * product.discVal) / 100;
      updatedProducts[index].amount = raw - discountAmount;
    }
  
    setProducts(updatedProducts);
  };
  

 

  const addProductRow = () => {
    setProducts([
      ...products,
      {
        id: (products.length + 1).toString(),
        code: "",
        name: "",
        qty: 0,
        price: 0,
        discVal: 0,
        sc: 0,
        amount: 0,
      },
    ]);
  };

  const totals = calculateTotals();

  const handleSave = async () => {
    const payload = {
      billId,
      storeId,
      storeName,
      organisationId: orgId,
      organisationName: orgName,
      products,
      salesTax: serviceTax + extraSaleTax, // or however you separate it
      serviceCh: serviceTax,
      withholdingTax,
      totalQty: totals.totalQty,
      totalAmount: totals.totalAmount,
      totalDiscount: totals.totalDiscount,
      netAmount: totals.netAmount,
    };
  
    try {
      const res = await fetch("http://localhost:5000/api/pos/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (res.ok) {
        const data = await res.json();
        alert("✅ Sale saved successfully!");
        console.log(data);
        // onOpenChange(false); // close modal
      } else {
        const err = await res.json();
        alert("❌ Failed to save: " + err.message);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error saving sale");
    }
  };

  const handleClear = () => {
    setBillId("");
    setStoreId("");
    setStoreName("");
    setOrgId("");
    setOrgName("");
    setProducts([
      {
        id: "1",
        code: "",
        name: "",
        qty: 0,
        price: 0,
        discVal: 0,
        sc: 0,
        amount: 0,
      },
    ]);
    setServiceTax(0);
    setWithholdingTax(0);
    setExtraSaleTax(0);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  
  
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="max-w-6xl max-h-[100vh] p-0">
    <div className="h-[100vh] overflow-y-auto p-6">
      <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <DialogTitle className="text-xl font-bold text-blue-900">Sale Invoice (POS)</DialogTitle>
        <Link to="/dashboard">
          <button className="text-black hover:text-red-500 transition-all duration-300">
            <X className="h-6 w-6" />
          </button>
        </Link>
      </DialogHeader>

      <div className="space-y-4">
        <div className="text-sm font-medium">Last Bill no. 09896</div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid grid-cols-[1fr,2fr] gap-4">
            <Input placeholder="Bill ID" value={billId}
    onChange={(e) => setBillId(e.target.value)} />
            <Input type="date" />
          </div>
          <div className="grid grid-cols-[1fr,2fr] gap-4">
            <Input placeholder="Store ID" value={storeId}
    onChange={(e) => setStoreId(e.target.value)} />
            <Input placeholder="Store Name" value={storeName}
    onChange={(e) => setStoreName(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-[1fr,2fr] gap-4">
          <Input placeholder="Organisation ID" value={orgId}
    onChange={(e) => setOrgId(e.target.value)} />
          <Input placeholder="Organisation Name"  value={orgName}
    onChange={(e) => setOrgName(e.target.value)} />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-[100px]">Code</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="w-[80px]">Qty</TableHead>
                <TableHead className="w-[100px]">Price</TableHead>
                <TableHead className="w-[100px]">Disc %</TableHead>
                <TableHead className="w-[80px]">SC</TableHead>
                <TableHead className="w-[100px]">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Input
                      className="h-8"
                      value={product.code}
                      onChange={(e) => handleProductChange(index, "code", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      className="h-8"
                      value={product.name}
                      onChange={(e) => handleProductChange(index, "name", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      className="h-8"
                      type="number"
                      value={product.qty}
                      onChange={(e) => handleProductChange(index, "qty", Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      className="h-8"
                      type="number"
                      value={product.price}
                      onChange={(e) => handleProductChange(index, "price", Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      className="h-8"
                      type="number"
                      value={product.discVal}
                      onChange={(e) => handleProductChange(index, "discVal", Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      className="h-8"
                      type="number"
                      value={product.sc}
                      onChange={(e) => handleProductChange(index, "sc", Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      className="h-8"
                      type="number"
                      value={product.amount}
                      readOnly
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button className="mt-4" onClick={addProductRow}>
          + Add Product
        </Button>

        <div className="grid grid-cols-[2fr,3fr] gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <p className="text-sm">Service Tax</p>
              <Input
                placeholder="Service Tax"
                type="number"
                value={serviceTax}
                onChange={(e) => setServiceTax(Number(e.target.value))}
              />
              <span className="w-12">(%)</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 text-center">
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
                  {totals.netAmount.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm">WithHolding Tax</p>
                <Input
                  placeholder="Withholding Tax"
                  type="number"
                  value={withholdingTax}
                  onChange={(e) => setWithholdingTax(Number(e.target.value))}
                />
                <span className="w-12">(%)</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm">Sales Tax</p>
                <Input
                  placeholder="Extra Sales Tax"
                  type="number"
                  value={extraSaleTax}
                  onChange={(e) => setExtraSaleTax(Number(e.target.value))}
                />
                <span className="w-12">(%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button className="bg-green-500 hover:bg-green-600" onClick={handlePrint}>Print</Button>
          <Button className="bg-blue-500 hover:bg-blue-600">Open</Button>
          <Button className="bg-red-500 hover:bg-red-600" onClick={handleClear} >Clear</Button>
          <Button type="button" className="bg-yellow-500 hover:bg-yellow-600 " onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
}



// import { useState } from "react"
// import { X } from "lucide-react"
// import { Link } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// interface ProductRow {
//   id: string
//   code: string
//   name: string
//   qty: number
//   price: number
//   discPc: number
//   discPercent: number
//   discVal: number
//   sc: number
//   amount: number
// }

// interface SaleInvoiceProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// export function SaleInvoice({ open, onOpenChange }: SaleInvoiceProps) {
//   const [products, setProducts] = useState<ProductRow[]>([
//     {
//       id: "1",
//       code: "",
//       name: "",
//       qty: 0,
//       price: 0,
//       discPc: 0,
//       discPercent: 0,
//       discVal: 0,
//       sc: 0,
//       amount: 0,
//     },
//   ])

//   const [billDisc, setBillDisc] = useState(0)
//   const [salesTax, setSalesTax] = useState(0)
//   const [serviceCh, setServiceCh] = useState(0)
//   const [withholdingTax, setWithholdingTax] = useState(0)
//   const [extraSaleTax, setExtraSaleTax] = useState(0)

//   const calculateTotals = () => {
//     const totalItems = products.length
//     const totalQty = products.reduce((sum, p) => sum + p.qty, 0)
//     const totalAmount = products.reduce((sum, p) => sum + p.amount, 0)
//     const totalDiscount = products.reduce((sum, p) => sum + p.discVal, 0)
//     const netAmount = totalAmount - totalDiscount

//     return {
//       totalItems,
//       totalQty,
//       totalAmount,
//       totalDiscount,
//       netAmount,
//     }
//   }

//   const totals = calculateTotals()

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl">
//       <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//   <DialogTitle className="text-xl font-bold text-blue-900 ">Sale Invoice (POS)</DialogTitle>
//   <Link to="/dashboard">
//     <button className="text-black hover:text-red-500 transition-all duration-300">
//       <X className="h-6 w-6" />
//     </button>
//   </Link>
// </DialogHeader>


//         <div className="space-y-4">
//           {/* Last Bill Number */}
//           <div className="text-sm font-medium">Last Bill no. 09896</div>

//           {/* Invoice Details */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="grid grid-cols-[1fr,2fr] gap-4">
//               <Input placeholder="Bill ID" />
//               <Input type="date" />
//             </div>
//             <div className="grid grid-cols-[1fr,2fr] gap-4">
//               <Input placeholder="Store ID" />
//               <Input placeholder="Store Name" />
//             </div>
//           </div>

//           <div className="grid grid-cols-[1fr,2fr] gap-4">
//             <Input placeholder="Organisation ID" />
//             <Input placeholder="Organisation Name" />
//           </div>

//           {/* Product Table */}
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-100">
//                   <TableHead className="w-[100px]">Code</TableHead>
//                   <TableHead>Product Name</TableHead>
//                   <TableHead className="w-[80px]">Qty</TableHead>
//                   <TableHead className="w-[100px]">Price</TableHead>
//                   <TableHead className="w-[100px]">Disc/PC</TableHead>
//                   <TableHead className="w-[80px]">Disc%</TableHead>
//                   <TableHead className="w-[100px]">Disc Val</TableHead>
//                   <TableHead className="w-[80px]">SC</TableHead>
//                   <TableHead className="w-[100px]">Amount</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {products.map((product) => (
//                   <TableRow key={product.id}>
//                     <TableCell>
//                       <Input className="h-8 " />
//                     </TableCell>
//                     <TableCell>
//                       <Input className="h-8" />
//                     </TableCell>
//                     <TableCell>
//                       <Input className="h-8" type="number" />
//                     </TableCell>
//                     <TableCell>
//                       <Input className="h-8" type="number" />
//                     </TableCell>
//                     <TableCell>
//                       <Input className="h-8" type="number" />
//                     </TableCell>
//                     <TableCell>
//                       <Input className="h-8" type="number" />
//                     </TableCell>
//                     <TableCell>
//                       <Input className="h-8" type="number" />
//                     </TableCell>
//                     <TableCell>
//                       <Input className="h-8" type="number" />
//                     </TableCell>
//                     <TableCell>
//                       <Input className="h-8" type="number" />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Summary Section */}
//           <div className="grid grid-cols-[2fr,3fr] gap-4">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm ">Bill.Discount</span>
//                 <Input
//                   placeholder="Bill Disc"
//                   type="number"
//                   value={billDisc}
//                   onChange={(e) => setBillDisc(Number(e.target.value))}
//                 />
//                 <span className="w-12">(%)</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <p className="text-sm " >Sales.Tax</p>
//                 <Input
//                   placeholder="Sales Tax"
//                   type="number"
//                   value={salesTax}
//                   onChange={(e) => setSalesTax(Number(e.target.value))}
//                 />
//                 <span className="w-12">(%)</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <p className="text-sm ">Service.Tax</p>
//                 <Input
//                   placeholder="Service Ch"
//                   type="number"
//                   value={serviceCh}
//                   onChange={(e) => setServiceCh(Number(e.target.value))}
//                 />
//                 <span className="w-12">(%)</span>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-5 gap-4 text-center">
//                 <div className="space-y-2">
//                   <div className="text-xs">Total Items</div>
//                   <div className="rounded bg-black px-4 py-2 font-mono text-2xl text-white">
//                     {totals.totalItems.toString().padStart(2, "0")}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="text-xs">Total Qty</div>
//                   <div className="rounded bg-green-500 px-4 py-2 font-mono text-2xl text-white">
//                     {totals.totalQty.toString().padStart(2, "0")}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="text-xs">Total Amount</div>
//                   <div className="rounded bg-yellow-500 px-4 py-2 font-mono text-2xl text-white">
//                     {totals.totalAmount.toString().padStart(2, "0")}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="text-xs">Total Discount</div>
//                   <div className="rounded bg-red-500 px-4 py-2 font-mono text-2xl text-white">
//                     {totals.totalDiscount.toString().padStart(2, "0")}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="text-xs">Net Amount</div>
//                   <div className="rounded bg-blue-500 px-4 py-2 font-mono text-2xl text-white">
//                     {totals.netAmount.toString().padStart(2, "0")}
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex items-center gap-2 ">
                  
//                   <p className="text-sm ">WithHolding.Tax</p>
                  
//                   <Input
//                     placeholder="Withholding Tax"
//                     type="number"
//                     value={withholdingTax}
//                     onChange={(e) => setWithholdingTax(Number(e.target.value))}
//                   />
//                   <span className="w-12">(%)</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <p className="text-sm ">ExtraSales.Tax</p>
//                   <Input
//                     placeholder="Extra Sale Tax"
//                     type="number"
//                     value={extraSaleTax}
//                     onChange={(e) => setExtraSaleTax(Number(e.target.value))}
//                   />
//                   <span className="w-12">(%)</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-center gap-4">
//             <Button className="bg-green-500 hover:bg-green-600">Print</Button>
//             <Button className="bg-blue-500 hover:bg-blue-600">Open</Button>
//             <Button className="bg-red-500 hover:bg-red-600">Clear</Button>
//             <Button className="bg-yellow-500 hover:bg-yellow-600">Save</Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
  
//   )
// }

