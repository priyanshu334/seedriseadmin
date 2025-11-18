import { supabase } from "@/lib/supabase";
import { supabaseServer } from "@/lib/supabaseserver";

export default async function FarmRecordsPage() {
  const { data: records } = await supabase
    .from("farm_records")
    .select("*, crops(name), users(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Farm Records</h1>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Farmer</th>
            <th className="p-2">Crop</th>
            <th className="p-2">Season</th>
            <th className="p-2">Land Area</th>
            <th className="p-2">Input Cost</th>
            <th className="p-2">Yield (kg)</th>
            <th className="p-2">Profit (₹)</th>
            <th className="p-2">View</th>
          </tr>
        </thead>

        <tbody>
          {records?.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.users?.name || "Unknown"}</td>
              <td className="p-2">{r.crops?.name}</td>
              <td className="p-2">{r.season}</td>
              <td className="p-2">{r.land_area} acres</td>
              <td className="p-2">₹{r.input_cost}</td>
              <td className="p-2">{r.yield}</td>
              <td className="p-2 font-semibold text-green-700">₹{r.profit}</td>

              <td className="p-2">
                <a
                  href={`/dashboard/farm-records/${r.id}`}
                  className="text-blue-600"
                >
                  Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
