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

const COLORS = [
  "#22C55E", // green
  "#F59E0B", // orange
  "#A16207", // brown
  "#D97706", // amber
  "#84CC16", // lime
  "#15803D", // dark green
  "#FBBF24", // yellow
  "#4B5563", // gray
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
      <Card className="shadow-lg border-0 bg-green-50 rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-green-800">
            Monthly Profit Trend
          </CardTitle>
          <CardDescription>Total profit earned each month</CardDescription>
        </CardHeader>
        <CardContent className="bg-green-100 rounded-lg p-2">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={profitTrendData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d1fae5" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#065f46" }} />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fontSize: 12, fill: "#065f46" }}
              />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 5, fill: "#16a34a" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 2. Crop Distribution */}
      <Card className="shadow-lg border-0 bg-yellow-50 rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-amber-800">
            Crop Distribution
          </CardTitle>
          <CardDescription>Farms growing each crop</CardDescription>
        </CardHeader>
        <CardContent className="bg-yellow-100 rounded-lg p-2">
          <ResponsiveContainer width="100%" height={250}>
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
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 3. Market Price Trends */}
      <Card className="shadow-lg border-0 bg-green-50 rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-green-800">
            Market Price Trends
          </CardTitle>
          <CardDescription>Last 6 months (top crops)</CardDescription>
        </CardHeader>
        <CardContent className="bg-green-100 rounded-lg p-2">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart>
              <CartesianGrid strokeDasharray="4 4" stroke="#d1fae5" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 11, fill: "#065f46" }}
                angle={-30}
                height={60}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fontSize: 11, fill: "#065f46" }}
              />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Legend verticalAlign="top" />
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
        </CardContent>
      </Card>

      {/* 4. Most Profitable Crops */}
      <Card className="shadow-lg border-0 bg-yellow-50 rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-amber-800">
            Top Profitable Crops
          </CardTitle>
          <CardDescription>Average profit per farmer</CardDescription>
        </CardHeader>
        <CardContent className="bg-yellow-100 rounded-lg p-2">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={profitableCropsData}
              layout="horizontal"
              margin={{ left: 10 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#fde68a" />
              <XAxis
                type="number"
                tickFormatter={formatCurrency}
                tick={{ fontSize: 11, fill: "#92400e" }}
              />
              <YAxis
                dataKey="crop"
                type="category"
                width={90}
                tick={{ fontSize: 11, fill: "#92400e" }}
              />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="avgProfit" fill="#f59e0b" radius={[8, 8, 8, 8]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 5. Cost Breakdown */}
      <Card className="shadow-lg border-0 bg-green-50 rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-green-800">
            Average Cost Structure
          </CardTitle>
          <CardDescription>Per crop cultivation cost</CardDescription>
        </CardHeader>
        <CardContent className="bg-green-100 rounded-lg p-2">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={costBreakdownData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85}
                label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
              >
                {costBreakdownData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 6. Yield vs Expected */}
      <Card className="shadow-lg border-0 bg-yellow-50 rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-amber-800">
            Yield Performance
          </CardTitle>
          <CardDescription>Actual vs Expected (tons/ha)</CardDescription>
        </CardHeader>
        <CardContent className="bg-yellow-100 rounded-lg p-2">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={yieldData} margin={{ bottom: 20 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#fde68a" />
              <XAxis
                dataKey="crop"
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 11, fill: "#92400e" }}
              />
              <YAxis tick={{ fontSize: 11, fill: "#92400e" }} />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Bar dataKey="expected" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
