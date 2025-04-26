import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import axios from "axios";

export function VisitorInsights() {
  const [visitorData, setVisitorData] = useState([]);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard");
        const dataFromDB = response.data.visitorInsights;
        setVisitorData(dataFromDB);
      } catch (error) {
        console.error("Failed to fetch visitor insights:", error);
      }
    };

    fetchVisitorData();
  }, []);

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
            <LineChart data={visitorData}>
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
  );
}
