import { supabase } from "@/lib/supabase";
import { supabaseServer } from "@/lib/supabaseserver";

export default async function BuyersPage() {
  const { data: buyers } = await supabase
    .from("buyers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buyers & FPOs</h1>

      <a
        href="/dashboard/buyers/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Buyer / FPO
      </a>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">District</th>
            <th className="p-2">Crop Needed</th>
            <th className="p-2">Type</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {buyers?.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-2">{b.name}</td>
              <td className="p-2">{b.district}</td>
              <td className="p-2">{b.crop_needed}</td>
              <td className="p-2">{b.type.toUpperCase()}</td>

              <td className="p-2 flex gap-4">
                <a
                  className="text-blue-600"
                  href={`/dashboard/buyers/edit/${b.id}`}
                >
                  Edit
                </a>

                <form action={`/dashboard/buyers/delete/${b.id}`} method="POST">
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
