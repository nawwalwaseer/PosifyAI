import { Package, ShoppingCart, Users } from 'lucide-react';
import { DashboardNavbar } from "@/components/layout/navbar";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { SalesSummary } from "@/components/dashboard/sales-summary";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TopProducts } from "@/components/dashboard/top-products";
import { VisitorInsights } from "@/components/dashboard/visitor-insights";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardPage() {
  // Static data for demonstration purposes
  const dashboardData = {
    totalCustomers: 120,
    totalProducts: 75,
    totalSuppliers: 10,
    totalSales: "50K",
    todaysOrders: 30,
    productsSold: 120,
    revenueByDay: [
      { day: 'Mon', revenue: 2000 },
      { day: 'Tue', revenue: 3000 },
      { day: 'Wed', revenue: 2500 },
      { day: 'Thu', revenue: 4000 },
      { day: 'Fri', revenue: 5000 }
    ],
    visitorInsights: [
      { day: 'Mon', visitors: 500 },
      { day: 'Tue', visitors: 600 },
      { day: 'Wed', visitors: 550 },
      { day: 'Thu', visitors: 700 },
      { day: 'Fri', visitors: 800 }
    ],
    topProducts: [
      { name: 'Product A', totalSold: 50 },
      { name: 'Product B', totalSold: 40 },
      { name: 'Product C', totalSold: 30 },
      { name: 'Product D', totalSold: 20 },
      { name: 'Product E', totalSold: 10 }
    ]
  };

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
                      value={dashboardData.totalSales.toString()}
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


// import { Package, ShoppingCart, Users } from 'lucide-react';
// import { DashboardNavbar } from "@/components/layout/navbar";
// import { DashboardSidebar } from "@/components/layout/sidebar";
// import { RevenueChart } from "@/components/dashboard/revenue-chart";
// import { SalesSummary } from "@/components/dashboard/sales-summary";
// import { StatsCard } from "@/components/dashboard/stats-card";
// import { TopProducts } from "@/components/dashboard/top-products";
// import { VisitorInsights } from "@/components/dashboard/visitor-insights";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { useEffect, useState } from "react";
// // import { fetchDashboardData } from "../services/dashboardService"; // Ensure the import path is correct

// export default function DashboardPage() {
//   const [dashboardData, setDashboardData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const getDashboardData = async () => {
//       try {
//         const data = await fetchDashboardData(); // Fetch data from backend
//         setDashboardData(data);
//       } catch (err) {
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getDashboardData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Display loading text while data is fetching
//   }

//   if (error) {
//     return <div>{error}</div>; // Display error message if something goes wrong
//   }

//   return (
//     <div className="flex justify-start">
//       <div className="mr-8">
//         <SidebarProvider>
//           <div className="flex min-h-screen">
//             <DashboardSidebar />
//             <div className="flex-1">
//               <DashboardNavbar />
//               <main className="p-6">
//                 <div className="grid gap-6">
//                   {/* Stats Overview */}
//                   <div className="grid gap-6 md:grid-cols-4">
//                     <StatsCard
//                       title="Total Customer"
//                       value={dashboardData.totalCustomers}
//                       icon={<Users className="h-4 w-4 text-muted-foreground" />}
//                       className="bg-blue-100"
//                     />
//                     <StatsCard
//                       title="Total Product"
//                       value={dashboardData.totalProducts}
//                       icon={<Package className="h-4 w-4 text-muted-foreground" />}
//                       className="bg-slate-100"
//                     />
//                     <StatsCard
//                       title="Total Supplier"
//                       value={dashboardData.totalSuppliers}
//                       icon={<Users className="h-4 w-4 text-muted-foreground" />}
//                       className="bg-red-100"
//                     />
//                     <StatsCard
//                       title="Total Sale"
//                       value={dashboardData.totalSales}
//                       icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
//                       className="bg-green-100"
//                     />
//                   </div>

//                   {/* Sales Summary */}
//                   <div className="space-y-4">
//                     <h2 className="text-lg font-semibold text-blue-900">Today's Sales</h2>
//                     <SalesSummary salesData={dashboardData.todaysOrders} />
//                   </div>

//                   {/* Charts and Tables */}
//                   <div className="grid gap-6 md:grid-cols-2">
//                     <VisitorInsights data={dashboardData.visitorInsights} />
//                     <TopProducts products={dashboardData.topProducts} />
//                   </div>

//                   {/* Revenue Chart */}
//                   <RevenueChart data={dashboardData.revenueByDay} />
//                 </div>
//               </main>
//             </div>
//           </div>
//         </SidebarProvider>
//       </div>
//     </div>
//   );
// }
