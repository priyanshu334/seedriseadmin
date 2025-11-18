import { supabaseServer } from "@/lib/supabaseserver";

export default async function SchemesPage() {
  const { data: schemes } = await supabaseServer.from("schemes").select("*");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Schemes</h1>

      <a
        href="/dashboard/schemes/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Scheme
      </a>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">State</th>
            <th className="p-2">Language</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {schemes?.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.title}</td>
              <td className="p-2">{s.state}</td>
              <td className="p-2">{s.language}</td>

              <td className="p-2 flex gap-4">
                <a
                  className="text-blue-600"
                  href={`/dashboard/schemes/edit/${s.id}`}
                >
                  Edit
                </a>

                {/* Delete Button */}
                <form
                  action={`/dashboard/schemes/delete/${s.id}`}
                  method="POST"
                >
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
