import { DashboardNavbar } from "@/components/layout/navbar"
import { DashboardSidebar } from "@/components/layout/sidebar"
import { StockReport } from "@/components/stock/stock-report"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function StockPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          <main className="p-6">
            <StockReport />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

