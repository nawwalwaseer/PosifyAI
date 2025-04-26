import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import axios from "axios"; // <== we use axios for HTTP requests

export function RevenueChart() {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard");
        const dataFromDB = response.data.revenueByDay;
        setRevenueData(dataFromDB); 
      } catch (error) {
        console.error("Failed to fetch revenue data:", error);
      }
    };

    fetchRevenueData();
  }, []);

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
            <BarChart data={revenueData}>
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
  );
}
