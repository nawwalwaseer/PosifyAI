import { useEffect, useState } from "react";
import { Copy, FileEdit, Printer, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define the Voucher type
interface Voucher {
  id: string;
  voucherNo: string;
  date: string;
  remark: string;
  debit: string;
  credit: string;
}

export function VoucherApproval() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    // Fetch voucher data from the API when the component mounts
    const fetchVouchers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vouchers");
        const data = await response.json();
        setVouchers(data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching voucher data:", error);
      }
    };

    fetchVouchers(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-0 pt-0">
        <CardTitle>Voucher Approval</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" className="px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300">
            Expand
          </Button>
          <Button variant="outline" className="px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" className="px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300">
            PDF
          </Button>
          <Button variant="outline" className="px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 hover:text-white transform hover:scale-110 transition-all duration-300">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL.</TableHead>
              <TableHead>Voucher no.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Remark</TableHead>
              <TableHead>Debit</TableHead>
              <TableHead>Credit</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vouchers.map((voucher) => (
              <TableRow key={voucher.id}>
                <TableCell>{voucher.id}</TableCell>
                <TableCell>{voucher.voucherNo}</TableCell>
                <TableCell>{voucher.date}</TableCell>
                <TableCell>{voucher.remark}</TableCell>
                <TableCell className="text-red-500">{voucher.debit}</TableCell>
                <TableCell className="text-green-500">{voucher.credit}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                      Approved
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
