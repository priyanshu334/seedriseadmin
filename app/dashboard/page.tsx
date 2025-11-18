import { supabaseServer } from "@/lib/supabaseserver";
import StatsCards from "./StatsCards";
import ChartsSection from "./ChartsSection";

export default async function DashboardPage() {
  // ===== Fetch data from Supabase =====

  const { count: farmers } = await supabaseServer
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: crops } = await supabaseServer
    .from("crops")
    .select("*", { count: "exact", head: true });

  const { data: records, count: farmRecords } = await supabaseServer
    .from("farm_records")
    .select("*", { count: "exact" });

  // Average profit
  const avgProfit =
    records?.length > 0
      ? Math.round(records.reduce((a, b) => a + b.profit, 0) / records.length)
      : 0;

  // Profit Trend (Monthly)
  const profitTrend = records?.reduce((acc: Record<string, number>, rec) => {
    const month = rec.created_at.substring(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + rec.profit;
    return acc;
  }, {});

  const profitTrendData = profitTrend
    ? Object.entries(profitTrend).map(([month, profit]) => ({
        month,
        profit,
      }))
    : [];

  // Crop Distribution
  const cropDistribution = {};

  records?.forEach((r) => {
    cropDistribution[r.crop_id] = (cropDistribution[r.crop_id] || 0) + 1;
  });

  const cropDistributionData = Object.entries(cropDistribution).map(
    ([crop, value]) => ({
      crop,
      value,
    })
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Analytics</h1>

      <StatsCards
        stats={{
          farmers,
          crops,
          farmRecords,
          avgProfit,
        }}
      />

      <ChartsSection
        profitTrendData={profitTrendData}
        cropDistributionData={cropDistributionData}
      />
    </div>
  );
}
