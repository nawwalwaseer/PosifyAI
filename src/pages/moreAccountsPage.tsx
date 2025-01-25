import { DashboardNavbar } from "@/components/layout/navbar";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { DebitVoucher } from "@/components/accounts/debit-voucher";
import { CreditVoucher } from "@/components/accounts/credit-voucher";
import { VoucherApproval } from "@/components/accounts/voucher-approval";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";

export default function MoreAccountsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          {/* Pass showAccountsButton to render the Accounts button in the navbar */}
          <DashboardNavbar showAccountsButton={true} />
          <main className="p-6">
            <Card className="border-2 border-blue-200 p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <DebitVoucher />
                <CreditVoucher />
              </div>
              <div className="mt-6">
                <VoucherApproval />
              </div>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// import { DashboardNavbar } from "@/components/layout/navbar"
// import { DashboardSidebar } from "@/components/layout/sidebar"
// import { DebitVoucher } from "@/components/accounts/debit-voucher"
// import { CreditVoucher } from "@/components/accounts/credit-voucher"
// import { VoucherApproval } from "@/components/accounts/voucher-approval"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { Card } from "@/components/ui/card"
// import { Link } from "react-router-dom"

// export default function MoreAccountsPage() {
//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen">
//         <DashboardSidebar />
//         <div className="flex-1">
//           <DashboardNavbar />
//           <main className="p-6">
//             <Card className="border-2 border-blue-200 p-6">
//               <div className="grid gap-6 md:grid-cols-2">
//                 <DebitVoucher />
//                 <CreditVoucher />
//               </div>
//               <div className="mt-6">
//                 <VoucherApproval />
//               </div>
//             </Card>
//           </main>
//           <Link to='/accounts'>
//           <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition-transform duration-200">
//             Accounts
//           </button>
//           </Link>

//         </div>
//       </div>
//     </SidebarProvider>
//   )
// }

