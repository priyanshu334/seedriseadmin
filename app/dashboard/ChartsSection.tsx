"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#0EA5E9"];

export default function ChartsSection({
  profitTrendData,
  cropDistributionData,
}: {
  profitTrendData: { month: string; profit: number }[];
  cropDistributionData: { crop: string; value: number }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Profit Trend */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h2 className="text-lg font-bold mb-4">Profit Trend (Monthly)</h2>

        <LineChart width={500} height={300} data={profitTrendData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#6366F1"
            strokeWidth={2}
          />
        </LineChart>
      </div>

      {/* Crop Distribution */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h2 className="text-lg font-bold mb-4">Crop Distribution</h2>

        <PieChart width={480} height={300}>
          <Pie
            data={cropDistributionData}
            dataKey="value"
            nameKey="crop"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#6366F1"
            label
          >
            {cropDistributionData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
