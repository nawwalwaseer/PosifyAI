import { BarChart2, Package, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SalesMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="bg-pink-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-pink-500" />
            <span className="text-2xl font-bold">$1k</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">+8% from yesterday</p>
        </CardContent>
      </Card>
      <Card className="bg-orange-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Total Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-orange-500" />
            <span className="text-2xl font-bold">300</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">+5% from yesterday</p>
        </CardContent>
      </Card>
      <Card className="bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Product Sold</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-green-500" />
            <span className="text-2xl font-bold">5</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">+1.2% from yesterday</p>
        </CardContent>
      </Card>
      <Card className="bg-purple-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Total Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-purple-500" />
            <span className="text-2xl font-bold">25</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">+2.4% from yesterday</p>
        </CardContent>
      </Card>
    </div>
  )
}

