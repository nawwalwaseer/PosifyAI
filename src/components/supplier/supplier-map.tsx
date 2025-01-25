import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SupplierMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Supplier Mapping by Country</CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          viewBox="0 0 1000 500"
          className="h-full w-full"
          style={{ minHeight: "300px" }}
        >
          <title >World Map with Supplier Mapping</title> 

          
          <path
            d="M 200 120 L 300 120 L 300 200 L 200 200 Z"
            fill="#FFD700"
            className="opacity-70 hover:opacity-100 transition-opacity"
            aria-label="North America"
          />
          <path
            d="M 250 250 L 350 250 L 350 350 L 250 350 Z"
            fill="#FF6B6B"
            className="opacity-70 hover:opacity-100 transition-opacity"
            aria-label="South America" 
          />
          <path
            d="M 400 150 L 500 150 L 500 250 L 400 250 Z"
            fill="#4ECDC4"
            className="opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Europe" 
          />
          <path
            d="M 550 200 L 650 200 L 650 300 L 550 300 Z"
            fill="#9B59B6"
            className="opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Asia" 
          />
          <path
            d="M 450 300 L 550 300 L 550 400 L 450 400 Z"
            fill="#2ECC71"
            className="opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Africa" 
          />
          <path
            d="M 700 350 L 800 350 L 800 450 L 700 450 Z"
            fill="#3498DB"
            className="opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Australia" 
          />
        </svg>
      </CardContent>
    </Card>
  )
}
