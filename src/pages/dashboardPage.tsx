import { useEffect, useState } from "react";
import axios from "axios";
import { Package, ShoppingCart, Users } from "lucide-react";

import { DashboardNavbar } from "@/components/layout/navbar";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { SalesSummary } from "@/components/dashboard/sales-summary";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TopProducts } from "@/components/dashboard/top-products";
import { VisitorInsights } from "@/components/dashboard/visitor-insights";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardData {
  totalCustomers: number;
  totalProducts: number;
  totalSuppliers: number;
  totalSales: string;
  todaysOrders: number;
  revenueByDay: { day: string; revenue: number }[];
  visitorInsights: { month: string; loyal: number; new: number; unique: number }[];
  topProducts: { id: string; name: string; popularity: number; sales: string }[];
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard");
        setDashboardData(response.data);
      } catch (err) {
        setError("Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !dashboardData) {
    return <div>{error || "No data available"}</div>;
  }

  return (
    <div className="flex justify-start">
      <div className="mr-8">
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
                      value={dashboardData.totalCustomers.toString()}
                      icon={<Users className="h-4 w-4 text-muted-foreground" />}
                      className="bg-blue-100"
                    />
                    <StatsCard
                      title="Total Product"
                      value={dashboardData.totalProducts.toString()}
                      icon={<Package className="h-4 w-4 text-muted-foreground" />}
                      className="bg-slate-100"
                    />
                    <StatsCard
                      title="Total Supplier"
                      value={dashboardData.totalSuppliers.toString()}
                      icon={<Users className="h-4 w-4 text-muted-foreground" />}
                      className="bg-red-100"
                    />
                    <StatsCard
                      title="Total Sale"
                      value={dashboardData.totalSales}
                      icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
                      className="bg-green-100"
                    />
                  </div>

                  {/* Sales Summary */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-blue-900">Today's Sales</h2>
                    <SalesSummary salesData={dashboardData.todaysOrders} />
                  </div>

                  {/* Charts and Tables */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <VisitorInsights data={dashboardData.visitorInsights} />
                    <TopProducts products={dashboardData.topProducts} />
                  </div>

                  {/* Revenue Chart */}
                  <RevenueChart data={dashboardData.revenueByDay} />
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
