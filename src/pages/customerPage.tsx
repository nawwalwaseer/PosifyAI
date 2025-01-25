import { CustomerForm } from "@/components/customers/customer-form";
import { CustomerLedger } from "@/components/customers/customer-ledger";
import { CustomerSatisfaction } from "@/components/customers/customer-satisfaction";
import { DashboardNavbar } from "@/components/layout/navbar";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function CustomersPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          <main className="p-6">
            <div className="flex flex-wrap gap-6">
              {/* Add Customer Form with reduced width */}
              <div className="w-full md:w-1/2 lg:w-1/3">
                <CustomerForm />
              </div>

              {/* Customer Ledger takes the remaining space */}
              <div className="flex-1 overflow-x-auto">
                <CustomerLedger />
              </div>
            </div>

            {/* Customer Satisfaction Section */}
            <div className="mt-6">
              <CustomerSatisfaction />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
