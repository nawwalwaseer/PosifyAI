import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function CustomerSatisfaction() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchSatisfactionData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers");
        const data = await response.json();
        setChartData(data.customerSatisfaction || []);
      } catch (error) {
        console.error("Error fetching customer satisfaction data:", error);
      }
    };

    fetchSatisfactionData();
  }, []);

  // Optional: calculate totals for bottom summary
  const totalLastMonth = chartData.reduce((sum, item) => sum + (item.lastMonth || 0), 0);
  const totalThisMonth = chartData.reduce((sum, item) => sum + (item.thisMonth || 0), 0);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Customer Satisfaction</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              lastMonth: {
                label: "Last Month",
                color: "hsl(var(--chart-1))",
              },
              thisMonth: {
                label: "This Month",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="lastMonth"
                  stroke="var(--color-lastMonth)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="thisMonth"
                  stroke="var(--color-thisMonth)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Month</p>
              <p className="text-2xl font-bold text-blue-900">{totalLastMonth.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-blue-900">{totalThisMonth.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
