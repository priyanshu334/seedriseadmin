"use client";

import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPrice() {
  const router = useRouter();
  const { id } = useParams();

  const [price, setPrice] = useState<any>(null);
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data: c } = await supabase.from("crops").select("*");
      setCrops(c || []);

      const { data: p } = await supabase
        .from("market_prices")
        .select("*")
        .eq("id", id)
        .single();

      setPrice(p);
    };
    load();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setPrice({ ...price, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("market_prices")
      .update({
        crop_id: price.crop_id,
        location: price.location,
        price: Number(price.price),
        source: price.source,
        date: price.date,
      })
      .eq("id", id);

    if (error) alert(error.message);
    else {
      alert("Updated!");
      router.push("/dashboard/prices");
    }
  };

  if (!price) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Market Price</h1>

      <select
        name="crop_id"
        className="border p-2 rounded w-full"
        value={price.crop_id}
        onChange={handleChange}
      >
        {crops.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        name="location"
        value={price.location}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        value={price.price}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="source"
        value={price.source}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={price.date}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Update
      </button>
    </div>
  );
}
