import { supabaseServer } from "@/lib/supabaseserver";

export default async function EducationPage() {
  const { data: items } = await supabaseServer
    .from("education_content")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Education Content</h1>

      <a
        href="/dashboard/education/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Content
      </a>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Type</th>
            <th className="p-2">Language</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items?.map((i) => (
            <tr key={i.id} className="border-t">
              <td className="p-2">{i.title}</td>
              <td className="p-2 capitalize">{i.type}</td>
              <td className="p-2">{i.language}</td>

              <td className="p-2 flex gap-4">
                <a
                  className="text-blue-600"
                  href={`/dashboard/education/edit/${i.id}`}
                >
                  Edit
                </a>

                <form
                  action={`/dashboard/education/delete/${i.id}`}
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
