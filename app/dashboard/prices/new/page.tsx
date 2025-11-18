"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Crop {
  id: string;
  name: string;
}

export default function NewPrice() {
  const router = useRouter();

  const [crops, setCrops] = useState<Crop[]>([]);
  const [form, setForm] = useState({
    crop_id: "",
    location: "",
    price: "",
    source: "",
    date: "",
  });

  useEffect(() => {
    const loadCrops = async () => {
      const { data } = await supabase.from("crops").select("*");
      setCrops(data || []);
    };
    loadCrops();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const { error } = await supabase.from("market_prices").insert({
      crop_id: form.crop_id,
      location: form.location,
      price: Number(form.price),
      source: form.source,
      date: form.date,
    });

    if (error) alert(error.message);
    else {
      alert("Market Price Added!");
      router.push("/dashboard/prices");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add Market Price</h1>

      <select
        name="crop_id"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      >
        <option value="">Select Crop</option>
        {crops.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        name="location"
        placeholder="Location (district/market)"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        placeholder="Price (₹ per kg)"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="source"
        placeholder="Source (AgMarket/eNAM/manual)"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Save Market Price
      </button>
    </div>
  );
}
