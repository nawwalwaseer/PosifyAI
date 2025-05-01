import { SalesHeader } from "@/components/sales/sales-header";
import { SalesMetrics } from "@/components/sales/sales-metrics";
import { SalesTable } from "@/components/sales/sales-table";
import { CustomerSatisfaction } from "@/components/customers/customer-satisfaction";
import { DashboardNavbar } from "@/components/layout/navbar";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function SalesPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <div className="flex-1 max-w-[1200px] mx-auto">
          <DashboardNavbar />
          <main className="p-6">
            {/* Layout */}
            <div className="grid lg:grid-cols-[2fr,1fr] gap-6 ">
              {/* Left Content */}
              <div className="space-y-6">
                <SalesHeader />
                <SalesMetrics />
                <SalesTable />
              </div>

              {/* Right Content */}
              {/* <div className="sticky top-6">
                {/* <CustomerSatisfaction /> */}
              {/* </div>  */}
              
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
