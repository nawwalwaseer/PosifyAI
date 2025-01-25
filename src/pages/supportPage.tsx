import { DashboardNavbar } from "@/components/layout/navbar"
import { DashboardSidebar } from "@/components/layout/sidebar"
import { SupportChat } from "@/components/support/support-chat"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SupportPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          <main className="p-6">
            <SupportChat />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

