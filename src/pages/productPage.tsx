import { DashboardNavbar } from "@/components/layout/navbar"
import { DashboardSidebar } from "@/components/layout/sidebar"
import { CategoryForm } from "@/components/product/category-form"
import { UnitForm } from "@/components/product/unit-form"
import { UnitTable } from "@/components/product/unit-table"
import { ProductForm } from "@/components/product/product-form"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function ProductPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          <main className="p-6">
            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-3">
                <CategoryForm />
                <UnitForm />
                <UnitTable />
              </div>
              <ProductForm />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

