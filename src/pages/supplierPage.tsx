import { DashboardNavbar } from "@/components/layout/navbar"
import { DashboardSidebar } from "@/components/layout/sidebar"
import { SupplierForm } from "@/components/supplier/supplier-form"
import { SupplierAdvance } from "@/components/supplier/supplier-advance"
import { SupplierMap } from "@/components/supplier/supplier-map"
import { SupplierLedger } from "@/components/supplier/supplier-ledger"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SupplierPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          <main className="p-6">
            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-3">
                <SupplierForm />
                <SupplierAdvance />
                <SupplierMap />
              </div>
              <SupplierLedger />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

