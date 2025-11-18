export default function StatsCards({
  stats: { farmers, crops, farmRecords, avgProfit },
}: {
  stats: {
    farmers: number;
    crops: number;
    farmRecords: number;
    avgProfit: number;
  };
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card label="Total Farmers" value={farmers} />
      <Card label="Total Crops" value={crops} />
      <Card label="Farm Records" value={farmRecords} />
      <Card label="Avg Profit" value={`₹${avgProfit}`} />
    </div>
  );
}

function Card({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg border">
      <p className="text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
