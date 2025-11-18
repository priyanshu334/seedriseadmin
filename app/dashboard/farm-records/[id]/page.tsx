import { supabaseServer } from "@/lib/supabaseserver";

export default async function FarmRecordDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { data: record } = await supabaseServer
    .from("farm_records")
    .select("*, crops(name), users(name, phone)")
    .eq("id", id)
    .single();

  if (!record) return <div className="p-6">Record not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Farm Record Details</h1>

      <div className="border rounded p-4 space-y-3 bg-white shadow">
        <p>
          <strong>Farmer:</strong> {record.users?.name}
        </p>
        <p>
          <strong>Phone:</strong> {record.users?.phone}
        </p>

        <p>
          <strong>Crop:</strong> {record.crops?.name}
        </p>
        <p>
          <strong>Season:</strong> {record.season}
        </p>
        <p>
          <strong>Land Area:</strong> {record.land_area} acres
        </p>

        <hr className="my-4" />

        <p>
          <strong>Input Cost:</strong> ₹{record.input_cost}
        </p>
        <p>
          <strong>Yield:</strong> {record.yield} kg
        </p>
        <p>
          <strong>Revenue:</strong> ₹{record.revenue}
        </p>
        <p className="text-green-700 font-bold">
          <strong>Profit:</strong> ₹{record.profit}
        </p>

        <p className="text-gray-500 text-sm mt-2">
          Created: {String(record.created_at).split("T")[0]}
        </p>
      </div>
    </div>
  );
}
