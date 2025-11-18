import { supabase } from "@/lib/supabase";
import { supabaseServer } from "@/lib/supabaseserver";

export default async function CropsPage() {
  const { data: crops } = await supabaseServer.from("crops").select("*");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Crops</h1>

      <a
        href="/dashboard/crops/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Crop
      </a>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Seed Cost</th>
            <th className="p-2">Yield</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {crops?.map((crop) => (
            <tr key={crop.id} className="border-t">
              <td className="p-2">{crop.name}</td>
              <td className="p-2">{crop.seed_cost}</td>
              <td className="p-2">{crop.expected_yield}</td>
              <td className="p-2">
                <a
                  href={`/dashboard/crops/edit/${crop.id}`}
                  className="text-blue-600"
                >
                  Edit
                </a>
                <button
                  onClick={async () => {
                    if (!confirm("Are you sure you want to delete this crop?"))
                      return;

                    const { error } = await supabase
                      .from("crops")
                      .delete()
                      .eq("id", crop.id);

                    if (error) alert(error.message);
                    else window.location.reload();
                  }}
                  className="text-red-600 ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
