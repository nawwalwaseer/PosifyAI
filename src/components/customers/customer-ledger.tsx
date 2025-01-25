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
import { Button } from "@/components/ui/button"

const transactions = [
  {
    date: "09/09/24",
    description: "Mishba (Counter sale)",
    voucherNo: "0010",
    debit: "0 RS",
    credit: "5000 RS",
    balance: "5000 RS",
  },
  {
    date: "09/10/24",
    description: "Hassaan (LHR retail store)",
    voucherNo: "0110",
    debit: "15000 RS",
    credit: "0 RS",
    balance: "15000 RS",
  },
  {
    date: "07/10/24",
    description: "Jasid (scheme sale)",
    voucherNo: "0114",
    debit: "0 RS",
    credit: "5000 RS",
    balance: "5000 RS",
  },
]

export function CustomerLedger() {
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
  )
}

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"

// const transactions = [
//   {
//     date: "09/09/24",
//     description: "Mishba (Counter sale)",
//     voucherNo: "0010",
//     debit: "0 RS",
//     credit: "5000 RS",
//     balance: "5000 RS",
//   },
//   {
//     date: "09/10/24",
//     description: "Hassaan (LHR retail store)",
//     voucherNo: "0110",
//     debit: "15000 RS",
//     credit: "0 RS",
//     balance: "15000 RS",
//   },
//   {
//     date: "07/10/24",
//     description: "Jasid (scheme sale)",
//     voucherNo: "0114",
//     debit: "0 RS",
//     credit: "5000 RS",
//     balance: "5000 RS",
//   },
// ]

// export function CustomerLedger() {
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-xl font-bold">Customer Ledger</CardTitle>
//         <div className="flex gap-2">
//           <Button variant="outline">Manage Customer</Button>
//           <Button variant="outline">Credit Customer</Button>
//           <Button variant="outline">Paid Customer</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <Table className="overflow-x-auto"> {/* Ensures table doesn't overflow */}
//           <TableHeader>
//             <TableRow>
//               <TableHead>Date</TableHead>
//               <TableHead>Description</TableHead>
//               <TableHead>Voucher no.</TableHead>
//               <TableHead>Debit</TableHead>
//               <TableHead>Credit</TableHead>
//               <TableHead>Balance</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {transactions.map((transaction) => (
//               <TableRow key={transaction.voucherNo}>
//                 <TableCell>{transaction.date}</TableCell>
//                 <TableCell>{transaction.description}</TableCell>
//                 <TableCell>{transaction.voucherNo}</TableCell>
//                 <TableCell>{transaction.debit}</TableCell>
//                 <TableCell>{transaction.credit}</TableCell>
//                 <TableCell>{transaction.balance}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow className="font-bold">
//               <TableCell colSpan={3}>Grand Total</TableCell>
//               <TableCell>15000 RS</TableCell>
//               <TableCell>10,000 RS</TableCell>
//               <TableCell className="text-red-500">25,000 RS</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }
