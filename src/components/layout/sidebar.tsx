import { Archive, BarChart3, Barcode, BotMessageSquare,  Home, ListOrdered, Package, Settings, ShoppingCart, User, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { BadgeDollarSign } from 'lucide-react';
import { Container } from 'lucide-react';


import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Define the structure of a menu item
interface MenuItem {
  icon?: React.ComponentType<{ className?: string }>; // Optional React component
  customIcon?: string; // Path to the custom image
  label: string;
  href: string;
}


const menuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: ShoppingCart, label: "Purchase", href: "/purchase" },
  { icon: Container, label: "Supplier", href: "/supplier" },
  { icon: BadgeDollarSign, label: "Sales", href: "/sales" },
  { icon: Barcode, label: "Products", href: "/products" },
  { icon: Archive, label: "Stocks", href: "/stock" },
  { icon: User, label: "Accounts", href: "/accounts" },
  // { icon: BotMessageSquare, label: "Support Genie", href: "/supportGenie" },
  { icon: ListOrdered, label: "Orders", href: "/orders" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="w-[150px]">
      <SidebarHeader className="border-b p-4">
        <a href="/" className="flex items-center gap-2 font-bold">
          <div className="text-xl">
            POS<span className="text-blue-600">ify</span>AI.
          </div>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 p-2 rounded-md ${
                    location.pathname === item.href
                      ? 'bg-gray-600 text-white' // Active item: dark grey background and white text
                      : 'hover:bg-gray-600 hover:text-white' // Inactive item: light grey on hover
                  }`}
                >
                  {/* Render icon or custom image with size h-5 w-5 */}
                  {item.icon && <item.icon className="h-5 w-5 " />} {/* Updated size */}
                  {item.customIcon && (
                    <img
                      src={item.customIcon}
                      alt={item.label}
                      className="h-5 w-5" // Updated size
                    />
                  )}
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
