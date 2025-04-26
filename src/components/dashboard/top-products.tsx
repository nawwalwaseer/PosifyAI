import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

// 👇 Define the product type
interface Product {
  id: string;
  name: string;
  popularity: number;
  sales: string;
}

export function TopProducts() {
  // 👇 Tell useState we expect an array of Product
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard");
        const dataFromDB = response.data.topProducts;
        setTopProducts(dataFromDB);
      } catch (error) {
        console.error("Failed to fetch top products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product) => (
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
  );
}
