export default function StatsCards({
  stats: { farmers, crops, farmRecords, avgProfit },
}: {
  stats: {
    farmers: number | null;
    crops: number | null;
    farmRecords: number | null;
    avgProfit: number;
  };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      <Card label="Total Farmers" value={farmers} icon="🌾" />
      <Card label="Total Crops" value={crops} icon="🌱" />
      <Card label="Farm Records" value={farmRecords} icon="📜" />
      <Card label="Avg Profit" value={`₹${avgProfit}`} icon="💰" />
    </div>
  );
}

function Card({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | null | string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-green-100 border border-green-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-gray-700 font-semibold text-lg">{label}</p>
      <p className="text-3xl font-bold text-green-800 mt-2">{value}</p>
    </div>
  );
}
