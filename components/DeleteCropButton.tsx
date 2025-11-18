"use client";

import { supabase } from "@/lib/supabase";

export default function DeleteCropButton({ id }: { id: number }) {
  const deleteCrop = async () => {
    if (!confirm("Are you sure you want to delete this crop?")) return;

    const { error } = await supabase.from("crops").delete().eq("id", id);

    if (error) alert(error.message);
    else window.location.reload();
  };

  return (
    <button onClick={deleteCrop} className="text-red-600 ml-4">
      Delete
    </button>
  );
}
