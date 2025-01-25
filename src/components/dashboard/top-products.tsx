import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const products = [
  { id: "01", name: "Piano Gel", popularity: 45, sales: "45k" },
  { id: "02", name: "Click Sky", popularity: 29, sales: "29k" },
  { id: "03", name: "A Star", popularity: 18, sales: "18k" },
  { id: "04", name: "Fineliner", popularity: 25, sales: "25k" },
]

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{product.id}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{product.name}</p>
                <Progress value={product.popularity} className="mt-2" />
              </div>
              <span className="text-sm font-medium">{product.sales}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

