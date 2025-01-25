import { DashboardNavbar } from "@/components/layout/navbar"
import { DashboardSidebar } from "@/components/layout/sidebar"
import { PurchaseForm } from "@/components/purchase/purchase-form"
import { PurchaseTable } from "@/components/purchase/purchase-table"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function PurchasePage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          <main className="p-6">
            <div className="space-y-6">
              <PurchaseForm />
              <PurchaseTable />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

