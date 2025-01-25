import { Package, ShoppingCart, Users } from 'lucide-react'
import { DashboardNavbar } from "@/components/layout/navbar"
import { DashboardSidebar } from "@/components/layout/sidebar"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { SalesSummary } from "@/components/dashboard/sales-summary"
import { StatsCard } from "@/components/dashboard/stats-card"
import { TopProducts } from "@/components/dashboard/top-products"
import { VisitorInsights } from "@/components/dashboard/visitor-insights"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardPage() {
  return (
    <div className='flex justify-start'>
      <div className='mr-8' >

<SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          <main className="p-6">
            <div className="grid gap-6">
              {/* Stats Overview */}
              <div className="grid gap-6 md:grid-cols-4">
                <StatsCard
                  title="Total Customer"
                  value="10"
                  icon={<Users className="h-4 w-4 text-muted-foreground" />}
                  className="bg-blue-100"
                />
                <StatsCard
                  title="Total Product"
                  value="20"
                  icon={<Package className="h-4 w-4 text-muted-foreground" />}
                  className="bg-slate-100"
                />
                <StatsCard
                  title="Total Supplier"
                  value="05"
                  icon={<Users className="h-4 w-4 text-muted-foreground" />}
                  className="bg-red-100"
                />
                <StatsCard
                  title="Total Sale"
                  value="25K"
                  icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
                  className="bg-green-100"
                />
              </div>

              {/* Sales Summary */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-blue-900">Today&apos;s Sales</h2>
                <SalesSummary />
              </div>

              {/* Charts and Tables */}
              <div className="grid gap-6 md:grid-cols-2">
                <VisitorInsights />
                <TopProducts />
              </div>

              {/* Revenue Chart */}
              <RevenueChart />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
    </div>
    </div>
  )
}

