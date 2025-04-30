  import { useState } from "react";
  import axios from "axios";
  import { Plus, ShoppingCart, Trash2 } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Textarea } from "@/components/ui/textarea";

  interface ItemRow {
    id: number;
    productName: string;
    stock: number;
    quantity: number;
    rate: number;
    total: number;
  }

  export function PurchaseForm() {
    const [supplier, setSupplier] = useState("");
    const [date, setDate] = useState(""); // Ensure it's a string
    const [invoiceNo, setInvoiceNo] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [details, setDetails] = useState("");
    const [discount, setDiscount] = useState<number>(0);  // State for discount, initialized as a number
    const [paidAmount, setPaidAmount] = useState<number>(0);  // State for paid amount, initialized as a number

    const [items, setItems] = useState<ItemRow[]>([
      { id: 1, productName: "", stock: 0, quantity: 0, rate: 0, total: 0 },
    ]);

    const addItem = () => {
      const newItem: ItemRow = {
        id: items.length + 1,
        productName: "",
        stock: 0,
        quantity: 0,
        rate: 0,
        total: 0,
      };
      setItems([...items, newItem]);
    };

    const clearRow = (id: number) => {
      setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (
      id: number,
      field: keyof ItemRow,
      value: string | number
    ) => {
      setItems(
        items.map((item) => {
          if (item.id === id) {
            const updatedItem = { ...item, [field]: value };
            if (field === "quantity" || field === "rate") {
              updatedItem.total = updatedItem.quantity * updatedItem.rate;
            }
            return updatedItem;
          }
          return item;
        })
      );
    };

    const calculateTotal = () => {
      return items.reduce((sum, item) => sum + item.total, 0);
    };

    const handleAddPurchase = async () => {
      const total = calculateTotal();
      const discountAmount = discount || 0;
      const grandTotal = total - discountAmount;
      const paid = paidAmount || 0;
      const dueAmount = grandTotal - paid;

      const purchaseData = {
        supplier,
        date: new Date(date).toISOString(), // Convert date to ISO string before sending
        invoiceNo,
        paymentType,
        details,
        items,
        total,
        discount: discountAmount,
        grandTotal,
        paidAmount: paid,
        dueAmount,
      };

      try {
        await axios.post("http://localhost:5000/api/purchases/add", purchaseData);
        
        // Reset form after successful submission
        setSupplier('');
        setDate('');
        setInvoiceNo('');
        setPaymentType('');
        setDetails('');
        setItems([{ id: 1, productName: '', stock: 0, quantity: 0, rate: 0, total: 0 }]);
        setDiscount(0);
        setPaidAmount(0);

        alert("Purchase added successfully!");
      } catch (error) {
        console.error("Failed to add purchase:", error);
        alert("Error saving purchase");
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Add Purchase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Purchase Details */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Supplier"
                      value={supplier}
                      onChange={(e) => setSupplier(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" onClick={addItem}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Invoice no."
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                />
                <Select onValueChange={setPaymentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                />
                <Textarea
                  placeholder="Details"
                  className="h-[104px]"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
            </div>

            {/* Item Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left text-blue-900">Item Information</th>
                    <th className="py-2 text-left text-blue-900">Stock/Qnt</th>
                    <th className="py-2 text-left text-blue-900">Qnty</th>
                    <th className="py-2 text-left text-blue-900">Rate</th>
                    <th className="py-2 text-left text-blue-900">Total</th>
                    <th className="py-2 text-left text-blue-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">
                        <Input
                          placeholder="Product Name"
                          value={item.productName}
                          onChange={(e) =>
                            updateItem(item.id, "productName", e.target.value)
                          }
                        />
                      </td>
                      <td className="py-2">
                        <Input
                          type="number"
                          value={item.stock}
                          onChange={(e) =>
                            updateItem(item.id, "stock", parseFloat(e.target.value) || 0)
                          }
                        />
                      </td>
                      <td className="py-2">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)
                          }
                        />
                      </td>
                      <td className="py-2">
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            updateItem(item.id, "rate", parseFloat(e.target.value) || 0)
                          }
                        />
                      </td>
                      <td className="py-2">
                        <Input type="number" value={item.total} readOnly />
                      </td>
                      <td className="py-2">
                        <Button
                          className="bg-green-600 hover:bg-green-700 transform hover:scale-110 transition-all duration-300"
                          variant="destructive"
                          size="icon"
                          onClick={() => clearRow(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-72 space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-900">Total:</span>
                  <span>{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-900">Discount:</span>
                  <Input
                    type="number"
                    className="w-24"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-blue-900">Grand Total:</span>
                  <span>{(calculateTotal() - parseFloat(discount || "0")).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-900">Paid Amount:</span>
                  <Input
                    type="number"
                    className="w-24"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-900">Due Amount:</span>
                  <span>
                    {(
                      (calculateTotal() - parseFloat(discount || "0")) - 
                      parseFloat(paidAmount || "0")
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700 transform hover:scale-110 transition-all duration-300" onClick={handleAddPurchase}>Add Purchase</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }




  // import { useState } from "react";
  // import { Plus, ShoppingCart, Trash2 } from "lucide-react";
  // import { Button } from "@/components/ui/button";
  // import {
  //   Card,
  //   CardContent,
  //   CardHeader,
  //   CardTitle,
  // } from "@/components/ui/card";
  // import { Input } from "@/components/ui/input";
  // import {
  //   Select,
  //   SelectContent,
  //   SelectItem,
  //   SelectTrigger,
  //   SelectValue,
  // } from "@/components/ui/select";
  // import { Textarea } from "@/components/ui/textarea";

  // interface ItemRow {
  //   id: number;
  //   productName: string;
  //   stock: number;
  //   quantity: number;
  //   rate: number;
  //   total: number;
  // }

  // export function PurchaseForm() {
  //   const [items, setItems] = useState<ItemRow[]>([
  //     { id: 1, productName: "", stock: 0, quantity: 0, rate: 0, total: 0 },
  //   ]);

  //   const addItem = () => {
  //     const newItem: ItemRow = {
  //       id: items.length + 1,
  //       productName: "",
  //       stock: 0,
  //       quantity: 0,
  //       rate: 0,
  //       total: 0,
  //     };
  //     setItems([...items, newItem]);
  //   };

  //   const clearRow = (id: number) => {
  //     setItems(
  //       items.map((item) =>
  //         item.id === id
  //           ? { ...item, productName: "", stock: 0, quantity: 0, rate: 0, total: 0 }
  //           : item
  //       )
  //     );
  //   };

  //   const updateItem = (
  //     id: number,
  //     field: keyof ItemRow,
  //     value: string | number
  //   ) => {
  //     setItems(
  //       items.map((item) => {
  //         if (item.id === id) {
  //           const updatedItem = { ...item, [field]: value };
  //           if (field === "quantity" || field === "rate") {
  //             updatedItem.total = updatedItem.quantity * updatedItem.rate;
  //           }
  //           return updatedItem;
  //         }
  //         return item;
  //       })
  //     );
  //   };

  //   const calculateTotal = () => {
  //     return items.reduce((sum, item) => sum + item.total, 0);
  //   };

  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle className="text-blue-900">Add Purchase</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="space-y-6">
  //           {/* Purchase Details */}
  //           <div className="grid gap-6 md:grid-cols-2">
  //             <div className="space-y-4">
  //               <div className="flex items-center gap-4">
  //                 <div className="flex-1">
  //                   <Input placeholder="Supplier" />
  //                 </div>
  //                 <Button variant="outline" size="icon">
  //                   <Plus className="h-4 w-4" />
  //                 </Button>
  //               </div>
  //               <Input placeholder="Invoice no." />
  //               <Select>
  //                 <SelectTrigger>
  //                   <SelectValue placeholder="Payment type" />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   <SelectItem value="cash">Cash</SelectItem>
  //                   <SelectItem value="card">Card</SelectItem>
  //                   <SelectItem value="bank">Bank Transfer</SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </div>
  //             <div className="space-y-4">
  //               <Input type="date" />
  //               <Textarea placeholder="Details" className="h-[104px]" />
  //             </div>
  //           </div>

  //           {/* Item Table */}
  //           <div className="overflow-x-auto">
  //             <table className="w-full">
  //               <thead>
  //                 <tr className="border-b">
  //                   <th className="py-2 text-left text-blue-900">Item Information</th>
  //                   <th className="py-2 text-left text-blue-900">Stock/Qnt</th>
  //                   <th className="py-2 text-left text-blue-900">Qnty</th>
  //                   <th className="py-2 text-left text-blue-900">Rate</th>
  //                   <th className="py-2 text-left text-blue-900">Total</th>
  //                   <th className="py-2 text-left text-blue-900">Action</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {items.map((item) => (
  //                   <tr key={item.id} className="border-b">
  //                     <td className="py-2">
  //                       <Input
  //                         placeholder="Product Name"
  //                         value={item.productName}
  //                         onChange={(e) =>
  //                           updateItem(item.id, "productName", e.target.value)
  //                         }
  //                       />
  //                     </td>
  //                     <td className="py-2">
  //                       <Input
  //                         type="number"
  //                         value={item.stock || ""}
  //                         onChange={(e) =>
  //                           updateItem(item.id, "stock", parseFloat(e.target.value) || 0)
  //                         }
  //                       />
  //                     </td>
  //                     <td className="py-2">
  //                       <Input
  //                         type="number"
  //                         value={item.quantity || ""}
  //                         onChange={(e) =>
  //                           updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)
  //                         }
  //                       />
  //                     </td>
  //                     <td className="py-2">
  //                       <Input
  //                         type="number"
  //                         value={item.rate || ""}
  //                         onChange={(e) =>
  //                           updateItem(item.id, "rate", parseFloat(e.target.value) || 0)
  //                         }
  //                       />
  //                     </td>
  //                     <td className="py-2">
  //                       <Input type="number" value={item.total || ""} readOnly />
  //                     </td>
  //                     <td className="py-2">
  //                       <Button
  //                       className="bg-green-600 hover:bg-green-700 transform hover:scale-110 transition-all duration-300"
  //                         variant="destructive"
  //                         size="icon"
  //                         onClick={() => clearRow(item.id)}
  //                       >
  //                         <Trash2 className="h-4 w-4" />
  //                       </Button>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>

  //           {/* Totals */}
  //           <div className="flex justify-end">
  //             <div className="w-72 space-y-2">
  //               <div className="flex justify-between">
  //                 <span className="text-blue-900">Total:</span>
  //                 <span>{calculateTotal().toFixed(2)}</span>
  //               </div>
  //               <div className="flex justify-between">
  //                 <span className="text-blue-900">Discount:</span>
  //                 <Input type="number" className="w-24" defaultValue="0.00" />
  //               </div>
  //               <div className="flex justify-between font-medium">
  //                 <span className="text-blue-900">Grand Total:</span>
  //                 <span>{calculateTotal().toFixed(2)}</span>
  //               </div>
  //               <div className="flex justify-between">
  //                 <span className="text-blue-900">Paid Amount:</span>
  //                 <Input type="number" className="w-24" defaultValue="0.00" />
  //               </div>
  //               <div className="flex justify-between">
  //                 <span className="text-blue-900">Due Amount:</span>
  //                 <span>0.00</span>
  //               </div>
  //               <Button variant="outline" className="w-full text-blue-900">
  //                 Full Paid
  //               </Button>
  //             </div>
  //           </div>

  //           {/* Submit Button */}
  //           <div className="flex justify-start">
  //             <Button className="w-[130px] px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300 ">
  //               <ShoppingCart className="mr-2 h-4 w-4" />
  //               Add Purchase
  //             </Button>
  //           </div>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // }
