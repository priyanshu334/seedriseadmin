// app/dashboard/page.tsx
import { supabase } from "@/lib/supabase";
import StatsCards from "./StatsCards";
import ChartsSection from "./ChartsSection";

// ────────────────────────────── Types ──────────────────────────────
interface FarmRecord {
  crop_name: string | null;
  profit: number | null;
  created_at: string | null;
  expected_yield: number | null;
  actual_yield: number | null;
}

interface CropCost {
  seed_cost: number | null;
  fertilizer_cost: number | null;
  irrigation_cost: number | null;
  labor_cost: number | null;
}

// Accept either object or array for crops (Supabase may return either)
interface MarketPriceRow {
  crop_id: string;
  price: number;
  date: string;
  crops: { name: string } | { name: string }[] | null;
}

// ──────────────────────── Dashboard Page ────────────────────────
export default async function DashboardPage() {
  // 1. Pure date – calculated once at request time (allowed in server components)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const dateFilter = sixMonthsAgo.toISOString().split("T")[0]; // "YYYY-MM-DD"

  // 2. Run all queries in parallel
  const [
    { count: farmers },
    { count: cropsCount },
    { data: farmRecordsRaw },
    { data: priceRaw },
    { data: allCrops },
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("crops").select("*", { count: "exact", head: true }),
    supabase.from("farm_records").select("*", { count: "exact" }),
    supabase
      .from("market_prices")
      .select("crop_id, price, date, crops!inner(name)")
      .gte("date", dateFilter)
      .order("date", { ascending: true }),
    supabase
      .from("crops")
      .select("seed_cost, fertilizer_cost, irrigation_cost, labor_cost"),
  ]);

  // ─────────────────────── Safe typed data ───────────────────────
  const records = (farmRecordsRaw ?? []) as FarmRecord[];
  const priceRows = (priceRaw ?? []) as MarketPriceRow[];
  const cropCosts = (allCrops ?? []) as CropCost[];

  // helper to normalize crop name whether crops is object or array
  const getCropName = (row: MarketPriceRow) => {
    if (Array.isArray(row.crops)) return row.crops[0]?.name ?? "Unknown";
    return row.crops?.name ?? "Unknown";
  };

  // 1. Stats
  const avgProfit =
    records.length > 0
      ? Math.round(
          records.reduce((s, r) => s + (r.profit ?? 0), 0) / records.length
        )
      : 0;

  // 2. Profit Trend (monthly)
  const profitTrendData = Object.entries(
    records.reduce((acc, r) => {
      const month = r.created_at?.slice(0, 7) ?? "Unknown";
      acc[month] = (acc[month] ?? 0) + (r.profit ?? 0);
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([month, profit]) => ({ month, profit }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // 3. Crop Distribution
  const cropDistributionFormatted = Object.entries(
    records.reduce((acc, r) => {
      const crop = r.crop_name ?? "Unknown";
      acc[crop] = (acc[crop] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([crop, value]) => ({ crop, value }));

  // 4. Market Price Trends (Top 5 crops) – reducer handles either crops object or array via getCropName
  const priceTrendsData = priceRows.reduce<
    { crop: string; data: { date: string; price: number }[] }[]
  >((acc, row) => {
    const cropName = getCropName(row);
    const existing = acc.find((x) => x.crop === cropName);
    const entry = { date: row.date, price: row.price ?? 0 };

    if (existing) {
      existing.data.push(entry);
    } else {
      acc.push({ crop: cropName, data: [entry] });
    }
    return acc;
  }, []);

  const priceTrendsFinal = priceTrendsData
    .sort((a, b) => b.data.length - a.data.length)
    .slice(0, 5);

  // 5. Most Profitable Crops
  const profitableMap = records.reduce((map, r) => {
    const crop = r.crop_name ?? "Unknown";
    const profit = r.profit ?? 0;
    const cur = map.get(crop) ?? { total: 0, count: 0 };
    map.set(crop, { total: cur.total + profit, count: cur.count + 1 });
    return map;
  }, new Map<string, { total: number; count: number }>());

  const profitableCropsFormatted = Array.from(profitableMap)
    .map(([crop, { total, count }]) => ({
      crop,
      avgProfit: count > 0 ? Math.round(total / count) : 0,
    }))
    .sort((a, b) => b.avgProfit - a.avgProfit)
    .slice(0, 8);

  // 6. Cost Breakdown
  const avgCosts =
    cropCosts.length > 0
      ? {
          seed: Math.round(
            cropCosts.reduce((s, c) => s + (c.seed_cost ?? 0), 0) /
              cropCosts.length
          ),
          fertilizer: Math.round(
            cropCosts.reduce((s, c) => s + (c.fertilizer_cost ?? 0), 0) /
              cropCosts.length
          ),
          irrigation: Math.round(
            cropCosts.reduce((s, c) => s + (c.irrigation_cost ?? 0), 0) /
              cropCosts.length
          ),
          labor: Math.round(
            cropCosts.reduce((s, c) => s + (c.labor_cost ?? 0), 0) /
              cropCosts.length
          ),
        }
      : { seed: 0, fertilizer: 0, irrigation: 0, labor: 0 };

  const costBreakdownData = [
    { name: "Seed", value: avgCosts.seed },
    { name: "Fertilizer", value: avgCosts.fertilizer },
    { name: "Irrigation", value: avgCosts.irrigation },
    { name: "Labor", value: avgCosts.labor },
  ].filter((i) => i.value > 0);

  // 7. Yield Data
  const yieldData = records
    .map((r) => ({
      crop: r.crop_name ?? "Unknown",
      expected: Number(r.expected_yield ?? 0),
      actual: Number(r.actual_yield ?? 0),
    }))
    .filter((r) => r.expected > 0 || r.actual > 0)
    .slice(0, 20);

  // ────────────────────────── Render ─────────────────────────────
  return (
    <div className="p-6 space-y-8 bg-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-900 mb-4">
        Farm Dashboard Analytics
      </h1>

      <StatsCards
        stats={{
          farmers: farmers ?? 0,
          crops: cropsCount ?? 0,
          farmRecords: records.length,
          avgProfit,
        }}
      />

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
