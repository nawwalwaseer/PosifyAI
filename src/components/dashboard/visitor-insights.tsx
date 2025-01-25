

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", loyal: 10, new: 8, unique: 12 },
  { month: "Feb", loyal: 15, new: 10, unique: 14 },
  { month: "Mar", loyal: 12, new: 12, unique: 15 },
  { month: "Apr", loyal: 18, new: 14, unique: 16 },
  { month: "May", loyal: 14, new: 16, unique: 18 },
  { month: "Jun", loyal: 16, new: 15, unique: 14 },
  { month: "Jul", loyal: 15, new: 14, unique: 16 },
]

export function VisitorInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Visitor Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            loyal: {
              label: "Loyal Customers",
              color: "hsl(var(--chart-1))",
            },
            new: {
              label: "New Customers",
              color: "hsl(var(--chart-2))",
            },
            unique: {
              label: "Unique Customers",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px] w-[380px] mr-8 "
        >
          <ResponsiveContainer width="100%" height="100%" className='mr-28'>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="loyal" stroke="var(--color-loyal)" />
              <Line type="monotone" dataKey="new" stroke="var(--color-new)" />
              <Line type="monotone" dataKey="unique" stroke="var(--color-unique)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

