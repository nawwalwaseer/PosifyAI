import { useState } from "react";
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
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, productName: "", stock: 0, quantity: 0, rate: 0, total: 0 }
          : item
      )
    );
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
                  <Input placeholder="Supplier" />
                </div>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Invoice no." />
              <Select>
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
              <Input type="date" />
              <Textarea placeholder="Details" className="h-[104px]" />
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
                        value={item.stock || ""}
                        onChange={(e) =>
                          updateItem(item.id, "stock", parseFloat(e.target.value) || 0)
                        }
                      />
                    </td>
                    <td className="py-2">
                      <Input
                        type="number"
                        value={item.quantity || ""}
                        onChange={(e) =>
                          updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)
                        }
                      />
                    </td>
                    <td className="py-2">
                      <Input
                        type="number"
                        value={item.rate || ""}
                        onChange={(e) =>
                          updateItem(item.id, "rate", parseFloat(e.target.value) || 0)
                        }
                      />
                    </td>
                    <td className="py-2">
                      <Input type="number" value={item.total || ""} readOnly />
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
                <Input type="number" className="w-24" defaultValue="0.00" />
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-blue-900">Grand Total:</span>
                <span>{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-900">Paid Amount:</span>
                <Input type="number" className="w-24" defaultValue="0.00" />
              </div>
              <div className="flex justify-between">
                <span className="text-blue-900">Due Amount:</span>
                <span>0.00</span>
              </div>
              <Button variant="outline" className="w-full text-blue-900">
                Full Paid
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <Button className="w-[130px] px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300 ">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add Purchase
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
