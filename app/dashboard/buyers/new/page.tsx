"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBuyer() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    district: "",
    crop_needed: "",
    contact: "",
    type: "buyer",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const { error } = await supabase.from("buyers").insert(form);

    if (error) alert(error.message);
    else {
      alert("Buyer/FPO Added!");
      router.push("/dashboard/buyers");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add Buyer / FPO</h1>

      <input
        name="name"
        placeholder="Name"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="district"
        placeholder="District"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="crop_needed"
        placeholder="Crops Needed"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="contact"
        placeholder="Contact Number"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <select
        name="type"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      >
        <option value="buyer">Buyer</option>
        <option value="fpo">FPO</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Save
      </button>
    </div>
  );
}
