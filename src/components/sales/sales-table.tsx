import { useEffect, useState } from 'react';
import { FileEdit, Trash2, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from 'axios';

interface Sale {
  id: string;
  invoiceNo: string;
  salesBy: string;
  customerName: string;
  date: string;
  totalAmount: string;
}

export function SalesTable() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sales');
        setSales(response.data.sales);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSalesData();
  }, []);

  // Calculate total amount dynamically
  const totalAmount = sales.reduce((acc, sale) => {
    const amount = parseInt(sale.totalAmount.replace(/\D/g, ""), 10) || 0;
    return acc + amount;
  }, 0);

  // Handle copy row to clipboard
  const handleCopyRow = (sale: Sale) => {
    const saleDetails = `Invoice No: ${sale.invoiceNo}\nSales By: ${sale.salesBy}\nCustomer Name: ${sale.customerName}\nDate: ${sale.date}\nTotal Amount: ${sale.totalAmount}`;
    navigator.clipboard.writeText(saleDetails)
      .then(() => alert('Sale details copied to clipboard!'))
      .catch((err) => console.error('Failed to copy:', err));
  };

  // Handle delete row
  const handleDeleteRow = (id: string) => {
    setSales((prevSales) => prevSales.filter((sale) => sale.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Manage Sale</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-900 text-center">SL</TableHead>
              <TableHead className="text-blue-900 text-center">Invoice No</TableHead>
              <TableHead className="text-blue-900 text-center">Sales By</TableHead>
              <TableHead className="text-blue-900 text-center">Customer Name</TableHead>
              <TableHead className="text-blue-900 text-center">Date</TableHead>
              <TableHead className="text-blue-900 text-center">Total Amount</TableHead>
              <TableHead className="text-blue-900 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale, index) => (
              <TableRow key={sale.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{sale.invoiceNo}</TableCell>
                <TableCell className="text-center">{sale.salesBy}</TableCell>
                <TableCell className="text-center">{sale.customerName}</TableCell>
                <TableCell className="text-center">{sale.date}</TableCell>
                <TableCell className="text-center">{sale.totalAmount}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopyRow(sale)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteRow(sale.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 text-right">
          <p className="font-semibold text-blue-900">
            Total Amount: <span className="text-black">{totalAmount.toLocaleString()} RS</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}




