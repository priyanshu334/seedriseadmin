"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const COLORS = [
  "#6366F1",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#0EA5E9",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
];

const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });

type Props = {
  profitTrendData: { month: string; profit: number }[];
  cropDistributionData: { crop: string; value: number }[];
  priceTrendsData: { crop: string; data: { date: string; price: number }[] }[];
  profitableCropsData: { crop: string; avgProfit: number }[];
  costBreakdownData: { name: string; value: number }[];
  yieldData: { crop: string; expected: number; actual: number }[];
};

export default function ChartsSection({
  profitTrendData,
  cropDistributionData,
  priceTrendsData = [],
  profitableCropsData = [],
  costBreakdownData = [],
  yieldData = [],
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      {/* 1. Profit Trend */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">
            Monthly Profit Trend
          </CardTitle>
          <CardDescription>Total profit earned each month</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              profit: { label: "Profit", theme: { light: "#6366F1" } },
            }}
            className="h-64"
          >
            <ResponsiveContainer>
              <LineChart data={profitTrendData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(v) => formatCurrency(Number(v))}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 2. Crop Distribution */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">Crop Distribution</CardTitle>
          <CardDescription>Farms growing each crop</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={Object.fromEntries(
              cropDistributionData.map((d, i) => [
                d.crop,
                { label: d.crop, theme: { light: COLORS[i % COLORS.length] } },
              ])
            )}
            className="h-64"
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={cropDistributionData}
                  dataKey="value"
                  nameKey="crop"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  label={({ value }) => `${value} farms`}
                >
                  {cropDistributionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 3. Market Price Trends (Top Crops) */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">
            Market Price Trends
          </CardTitle>
          <CardDescription>Last 6 months (top crops)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={Object.fromEntries(
              priceTrendsData.map((c, i) => [
                c.crop,
                { label: c.crop, theme: { light: COLORS[i % COLORS.length] } },
              ])
            )}
            className="h-64"
          >
            <ResponsiveContainer>
              <LineChart>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tick={{ fontSize: 11 }}
                  angle={-30}
                  height={60}
                />
                <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 11 }} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(v) => formatCurrency(Number(v))}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                {priceTrendsData.slice(0, 4).map((crop, i) => (
                  <Line
                    key={crop.crop}
                    type="monotone"
                    data={crop.data}
                    name={crop.crop}
                    dataKey="price"
                    stroke={COLORS[i % COLORS.length]}
                    strokeWidth={2.5}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 4. Most Profitable Crops */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">
            Top Profitable Crops
          </CardTitle>
          <CardDescription>Average profit per farmer</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              avgProfit: { label: "Avg Profit", theme: { light: "#22C55E" } },
            }}
            className="h-64"
          >
            <ResponsiveContainer>
              <BarChart data={profitableCropsData} layout="horizontal">
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  tickFormatter={formatCurrency}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  dataKey="crop"
                  type="category"
                  width={90}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(v) => formatCurrency(Number(v))}
                    />
                  }
                />
                <Bar dataKey="avgProfit" fill="#22C55E" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 5. Cost Breakdown */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">
            Average Cost Structure
          </CardTitle>
          <CardDescription>Per crop cultivation cost</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={Object.fromEntries(
              costBreakdownData.map((c, i) => [
                c.name,
                { label: c.name, theme: { light: COLORS[i % COLORS.length] } },
              ])
            )}
            className="h-64"
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  label={({ name, value }) =>
                    `${name}: ${formatCurrency(value)}`
                  }
                  labelLine={{ fontSize: 11 }}
                >
                  {costBreakdownData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(v) => formatCurrency(Number(v))}
                    />
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 6. Yield vs Expected */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">Yield Performance</CardTitle>
          <CardDescription>Actual vs Expected (tons/ha)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              expected: {
                label: "Expected",
                theme: { light: "#94a3b8", dark: "" },
              },
              actual: {
                label: "Actual",
                theme: { light: "#22C55E", dark: "" },
              },
            }}
            className="h-64"
          >
            <ResponsiveContainer>
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis
                  dataKey="crop"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 11 }}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="expected" fill="#94a3b8" />
                <Bar dataKey="actual" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
