import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import axios from "axios"

export function SalesHeader() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    invoiceNo: "",
    salesBy: "",
    customerName: "",
    date: "",
    totalAmount: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const payload = { sales: [formData] }

    try {
      await axios.post("http://localhost:5000/api/sales", payload)
      setFormData({
        id: "",
        invoiceNo: "",
        salesBy: "",
        customerName: "",
        date: "",
        totalAmount: "",
      })
      setShowForm(false)
      window.location.reload() // Or use a fetch refresh
    } catch (err) {
      console.error("Failed to submit sale", err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-blue-900">Today&apos;s Sales</h2>
        <div className="flex gap-2">
          <Button
            className="w-[100px] px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-full transform hover:scale-110 transition-all duration-300"
            onClick={() => setShowForm(!showForm)}
          >
            New Sale
          </Button>
          <Button variant="outline" className="rounded-full transform hover:scale-110 transition-all duration-300">
            POS Sale
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-gray-100">
          <Input name="id" placeholder="SL" value={formData.id} onChange={handleChange} />
          <Input name="invoiceNo" placeholder="Invoice No" value={formData.invoiceNo} onChange={handleChange} />
          <Input name="salesBy" placeholder="Sales By" value={formData.salesBy} onChange={handleChange} />
          <Input name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} />
          <Input name="date" placeholder="Date" value={formData.date} onChange={handleChange} />
          <Input name="totalAmount" placeholder="Total Amount" value={formData.totalAmount} onChange={handleChange} />

          <div className="col-span-full">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>
              Submit Sale
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}


// import { Button } from "@/components/ui/button"

// export function SalesHeader() {
//   return (
//     <div className="flex items-center justify-between ">
//       <h2 className="text-lg font-semibold text-blue-900">Today&apos;s Sales</h2>
//       <div className="flex gap-2">
//         <Button className="w-[100px]  px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-full transform hover:scale-110 transition-all duration-300  ">New Sale</Button>
//         <Button variant="outline" className="rounded-full transform hover:scale-110 transition-all duration-300 ">POS Sale</Button>
//       </div>
//     </div>
//   )
// }

