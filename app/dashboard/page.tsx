import { supabase } from "@/lib/supabase";
import StatsCards from "./StatsCards";
import ChartsSection from "./ChartsSection";

export default async function DashboardPage() {
  // ===== Basic Counts
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
      ? Math.round(
          records.reduce((a, b) => a + (b.profit ?? 0), 0) / records.length
        )
      : 0;

  // 1. Profit Trend
  const profitTrendData = records
    ? Object.entries(
        records.reduce((acc: Record<string, number>, rec) => {
          const month = rec.created_at?.substring(0, 7) ?? "Unknown";
          acc[month] = (acc[month] || 0) + (rec.profit ?? 0);
          return acc;
        }, {})
      )
        .map(([month, profit]) => ({ month, profit }))
        .sort((a, b) => a.month.localeCompare(b.month))
    : [];

  // 2. Crop Distribution
  const cropDistributionData =
    records?.reduce((acc: Record<string, number>, r) => {
      const cropName = r.crop_name ?? "Unknown Crop";
      acc[cropName] = (acc[cropName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) ?? {};

  const cropDistributionFormatted = Object.entries(cropDistributionData).map(
    ([crop, value]) => ({ crop, value })
  );

  // 3. Market Price Trends (Last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const dateString = sixMonthsAgo.toISOString().split("T")[0];

  const { data: priceRaw } = await supabase
    .from("market_prices")
    .select("crop_id, price, date, crops!inner(name)")
    .gte("date", dateString)
    .order("date", { ascending: true });

  const priceTrendsData =
    priceRaw?.reduce(
      (acc: { crop: string; data: { date: string; price: number }[] }[], p) => {
        const cropName = p.crops?.name ?? "Unknown";
        const existing = acc.find((item) => item.crop === cropName);
        const entry = { date: p.date ?? "", price: p.price ?? 0 };

        if (existing) {
          existing.data.push(entry);
        } else {
          acc.push({ crop: cropName, data: [entry] });
        }
        return acc;
      },
      []
    ) ?? [];

  // Limit to top 5 crops with most data points
  const priceTrendsFinal = priceTrendsData
    .sort((a, b) => b.data.length - a.data.length)
    .slice(0, 5);

  // 4. Most Profitable Crops
  const profitableCropsData =
    records?.reduce((acc: Map<string, { total: number; count: number }>, r) => {
      const cropName = r.crop_name ?? "Unknown Crop";
      const profit = r.profit ?? 0;
      const current = acc.get(cropName) || { total: 0, count: 0 };
      acc.set(cropName, {
        total: current.total + profit,
        count: current.count + 1,
      });
      return acc;
    }, new Map()) ?? new Map();

  const profitableCropsFormatted = Array.from(profitableCropsData.entries())
    .map(([crop, { total, count }]) => ({
      crop,
      avgProfit: Math.round(total / count),
    }))
    .sort((a, b) => b.avgProfit - a.avgProfit)
    .slice(0, 8);

  // 5. Average Cost Breakdown
  const { data: allCrops } = await supabase
    .from("crops")
    .select("seed_cost, fertilizer_cost, irrigation_cost, labor_cost");

  const avgCosts =
    allCrops && allCrops.length > 0
      ? {
          seed: Math.round(
            allCrops.reduce((sum, c) => sum + (c.seed_cost ?? 0), 0) /
              allCrops.length
          ),
          fertilizer: Math.round(
            allCrops.reduce((sum, c) => sum + (c.fertilizer_cost ?? 0), 0) /
              allCrops.length
          ),
          irrigation: Math.round(
            allCrops.reduce((sum, c) => sum + (c.irrigation_cost ?? 0), 0) /
              allCrops.length
          ),
          labor: Math.round(
            allCrops.reduce((sum, c) => sum + (c.labor_cost ?? 0), 0) /
              allCrops.length
          ),
        }
      : { seed: 0, fertilizer: 0, irrigation: 0, labor: 0 };

  const costBreakdownData = [
    { name: "Seed", value: avgCosts.seed },
    { name: "Fertilizer", value: avgCosts.fertilizer },
    { name: "Irrigation", value: avgCosts.irrigation },
    { name: "Labor", value: avgCosts.labor },
  ].filter((item) => item.value > 0);

  // 6. Yield Performance
  const yieldData =
    records
      ?.map((r) => ({
        crop: r.crop_name ?? "Unknown",
        expected: Number(r.expected_yield ?? 0),
        actual: Number(r.actual_yield ?? 0),
      }))
      .filter((r) => r.expected > 0 || r.actual > 0)
      .slice(0, 20) ?? [];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCards stats={{ farmers, crops, farmRecords, avgProfit }} />
      </div>

      <ChartsSection
        profitTrendData={profitTrendData}
        cropDistributionData={cropDistributionFormatted}
        priceTrendsData={priceTrendsFinal}
        profitableCropsData={profitableCropsFormatted}
        costBreakdownData={costBreakdownData}
        yieldData={yieldData}
      />
    </div>
  );
}
