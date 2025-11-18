import { supabase } from "@/lib/supabase";
import StatsCards from "./StatsCards";
import ChartsSection from "./ChartsSection";

export default async function DashboardPage() {
  // ===== Fetch data from Supabase =====
  const { count: farmers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: crops } = await supabase
    .from("crops")
    .select("*", { count: "exact", head: true });

  const { data: records, count: farmRecords } = await supabase
    .from("farm_records")
    .select("*", { count: "exact" });

  const avgProfit =
    records && records.length > 0
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
  const cropDistribution: Record<string, number> = {};
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
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCards
          stats={{
            farmers,
            crops,
            farmRecords,
            avgProfit,
          }}
        />
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        <ChartsSection
          profitTrendData={profitTrendData}
          cropDistributionData={cropDistributionData}
        />
      </div>
    </div>
  );
}
