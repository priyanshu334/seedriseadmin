import { supabase } from "@/lib/supabase";
import { supabaseServer } from "@/lib/supabaseserver";

export default async function PricesPage() {
  const { data: prices } = await supabase
    .from("market_prices")
    .select("*, crops(name)");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Market Prices</h1>

      <a
        href="/dashboard/prices/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Price
      </a>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Crop</th>
            <th className="p-2">Location</th>
            <th className="p-2">Price (₹/kg)</th>
            <th className="p-2">Source</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {prices?.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.crops?.name}</td>
              <td className="p-2">{p.location}</td>
              <td className="p-2">{p.price}</td>
              <td className="p-2">{p.source}</td>
              <td className="p-2">{p.date}</td>

              <td className="p-2 flex gap-4">
                <a
                  href={`/dashboard/prices/edit/${p.id}`}
                  className="text-blue-600"
                >
                  Edit
                </a>

                <form action={`/dashboard/prices/delete/${p.id}`} method="POST">
                  <button className="text-red-600">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
