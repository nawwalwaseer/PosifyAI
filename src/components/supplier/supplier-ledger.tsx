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
import { useEffect, useState } from "react"
import axios from "axios"

interface Supplier {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
}

export function SupplierLedger() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  // Fetch suppliers data from the API when component mounts
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/suppliers")
        setSuppliers(response.data) // Set supplier data into state
      } catch (error) {
        console.error("Error fetching suppliers:", error)
      }
    }

    fetchSuppliers()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-blue-900">Supplier Ledger</CardTitle>
        <Button
          variant="outline"
          className="w-[200px]  px-4 py-2 text-lg bg-green-600 hover:bg-green-700 text-white hover:text-white rounded-full transform hover:scale-110 transition-all duration-300 "
        >
          Manage Supplier
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-900">No.</TableHead> {/* Sequential number header */}
              <TableHead className="text-blue-900">Name</TableHead>
              <TableHead className="text-blue-900">Email</TableHead>
              <TableHead className="text-blue-900">Phone</TableHead>
              <TableHead className="text-blue-900">Address</TableHead>
              <TableHead className="text-blue-900">City</TableHead>
              <TableHead className="text-blue-900">State</TableHead>
              <TableHead className="text-blue-900">Country</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier, index) => (
              <TableRow key={supplier._id}>
                <TableCell>{index + 1}</TableCell> {/* Display sequential number */}
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>{supplier.city}</TableCell>
                <TableCell>{supplier.state}</TableCell>
                <TableCell>{supplier.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
