import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { month: "Jan", lastMonth: 3000, thisMonth: 4000 },
  { month: "Feb", lastMonth: 3200, thisMonth: 4200 },
  { month: "Mar", lastMonth: 3100, thisMonth: 4500 },
  { month: "Apr", lastMonth: 3400, thisMonth: 4300 },
  { month: "May", lastMonth: 3300, thisMonth: 4800 },
  { month: "Jun", lastMonth: 3700, thisMonth: 4600 },
  { month: "Jul", lastMonth: 3900, thisMonth: 5000 },
];

export function CustomerSatisfaction() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Customer Satisfaction</CardTitle>
        </CardHeader>
        <CardContent >
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
            className="h-[300px]  w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
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
              <p className="text-2xl font-bold text-blue-900">3,004</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-blue-900">4,504</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
