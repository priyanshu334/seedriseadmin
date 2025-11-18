export default function Dashboard() {
  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <a href="/dashboard/crops" className="p-4 bg-white shadow rounded-xl">
          Manage Crops
        </a>

        <a href="/dashboard/schemes" className="p-4 bg-white shadow rounded-xl">
          Manage Schemes
        </a>

        <a href="/dashboard/prices" className="p-4 bg-white shadow rounded-xl">
          Market Prices
        </a>

        <a href="/dashboard/buyers" className="p-4 bg-white shadow rounded-xl">
          Buyers & FPOs
        </a>
      </div>
    </div>
  );
}
