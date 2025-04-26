import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
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
import { Button } from "@/components/ui/button";

export function CustomerLedger() {
  const [transactions, setTransactions] = useState<any[]>([]); // State to hold the fetched transactions

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers");
        const data = response.data;
        setTransactions(data.customerLedger || []);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
  
    fetchCustomerData();
  }, []);
  

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-blue-900">Ledger</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" className="text-blue-900 hover:text-blue-900">Manage Customer</Button>
          <Button variant="outline" className="text-blue-900 hover:text-blue-900">Credit Customer</Button>
          <Button variant="outline" className="text-blue-900 hover:text-blue-900">Paid Customer</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-900">Date</TableHead>
              <TableHead className="text-blue-900">Description</TableHead>
              <TableHead className="text-blue-900">Voucher no.</TableHead>
              <TableHead className="text-blue-900">Debit</TableHead>
              <TableHead className="text-blue-900">Credit</TableHead>
              <TableHead className="text-blue-900">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.voucherNo}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.voucherNo}</TableCell>
                <TableCell>{transaction.debit}</TableCell>
                <TableCell>{transaction.credit}</TableCell>
                <TableCell>{transaction.balance}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell colSpan={3} className="text-blue-900">Grand Total</TableCell>
              <TableCell>15000 RS</TableCell>
              <TableCell>10,000 RS</TableCell>
              <TableCell className="text-red-500">25,000 RS</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
