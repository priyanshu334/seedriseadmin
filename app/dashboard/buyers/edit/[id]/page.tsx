"use client";

import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBuyer() {
  const router = useRouter();
  const { id } = useParams();

  const [buyer, setBuyer] = useState<any>(null);

  useEffect(() => {
    const loadBuyer = async () => {
      const { data } = await supabase
        .from("buyers")
        .select("*")
        .eq("id", id)
        .single();

      setBuyer(data);
    };
    loadBuyer();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setBuyer({ ...buyer, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    const { error } = await supabase.from("buyers").update(buyer).eq("id", id);

    if (error) alert(error.message);
    else {
      alert("Updated!");
      router.push("/dashboard/buyers");
    }
  };

  if (!buyer) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Buyer / FPO</h1>

      <input
        name="name"
        className="border p-2 rounded w-full"
        value={buyer.name}
        onChange={handleChange}
      />

      <input
        name="district"
        className="border p-2 rounded w-full"
        value={buyer.district}
        onChange={handleChange}
      />

      <input
        name="crop_needed"
        className="border p-2 rounded w-full"
        value={buyer.crop_needed}
        onChange={handleChange}
      />

      <input
        name="contact"
        className="border p-2 rounded w-full"
        value={buyer.contact}
        onChange={handleChange}
      />

      <select
        name="type"
        className="border p-2 rounded w-full"
        value={buyer.type}
        onChange={handleChange}
      >
        <option value="buyer">Buyer</option>
        <option value="fpo">FPO</option>
      </select>

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Save Changes
      </button>
    </div>
  );
}
