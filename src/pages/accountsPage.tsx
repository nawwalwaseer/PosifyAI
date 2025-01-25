// import { DashboardNavbar } from "@/components/layout/navbar"
// import { DashboardSidebar } from "@/components/layout/sidebar"
// import { OpeningBalance } from "@/components/accounts/opening-balance"
// import { SupplierPayment } from "@/components/accounts/supplier-payment"
// import { CashAdjustment } from "@/components/accounts/cash-adjustment"
// import { CustomerReceive } from "@/components/accounts/customer-receive"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { Button } from "@/components/ui/button"; // Adjust the path as needed
// import { Link } from "react-router-dom"


// export default function AccountsPage() {
//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen">
//         <DashboardSidebar />
//         <div className="flex-1">
//           <DashboardNavbar/>
          
//           <main className="p-6">
//             <div className="grid gap-6 md:grid-cols-2">
//               <OpeningBalance />
//               <SupplierPayment />
//               <CashAdjustment />
//               <CustomerReceive />
              
//             </div>
            
//           </main>
          
          
//           <Button variant="default" size="sm"> 
//           <Link to="/moreAccounts">
//               More Accounts
//               </Link>
//           </Button>
          
            
//         </div>
//       </div>
//     </SidebarProvider>
//   )
// }

import { DashboardNavbar } from "@/components/layout/navbar";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { OpeningBalance } from "@/components/accounts/opening-balance";
import { SupplierPayment } from "@/components/accounts/supplier-payment";
import { CashAdjustment } from "@/components/accounts/cash-adjustment";
import { CustomerReceive } from "@/components/accounts/customer-receive";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AccountsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar showMoreAccountsButton /> {/* Pass a prop to conditionally show the button */}
          <main className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <OpeningBalance />
              <SupplierPayment />
              <CashAdjustment />
              <CustomerReceive />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
