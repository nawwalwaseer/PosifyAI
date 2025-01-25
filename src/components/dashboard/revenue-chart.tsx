
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Monday", online: 15000, offline: 12000 },
  { day: "Tuesday", online: 18000, offline: 14000 },
  { day: "Wednesday", online: 22000, offline: 16000 },
  { day: "Thursday", online: 19000, offline: 15000 },
  { day: "Friday", online: 21000, offline: 17000 },
  { day: "Saturday", online: 25000, offline: 19000 },
  { day: "Sunday", online: 23000, offline: 18000 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          config={{
            online: {
              label: "Online Sales",
              color: "hsl(var(--chart-1))",
            },
            offline: {
              label: "Offline Sales",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[350px] flex justify-center "
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="online" fill="var(--color-online)" />
              <Bar dataKey="offline" fill="var(--color-offline)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

