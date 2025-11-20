"use client";

import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define your data shapes
interface Crop {
  id: string;
  name: string;
  // add other fields if needed
}

interface MarketPrice {
  id: string;
  crop_id: string;
  location: string;
  price: number;
  source: string;
  date: string; // YYYY-MM-DD format from <input type="date">
}

export default function EditPrice() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [price, setPrice] = useState<MarketPrice | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);

  // Load crops + current price record
  useEffect(() => {
    const loadData = async () => {
      // Load all crops for the dropdown
      const { data: cropData, error: cropError } = await supabase
        .from("crops")
        .select("id, name");

      if (cropError) {
        console.error("Error loading crops:", cropError);
        alert("Failed to load crops");
        return;
      }
      setCrops(cropData ?? []);

      // Load the specific market price record
      const { data: priceData, error: priceError } = await supabase
        .from("market_prices")
        .select("*")
        .eq("id", id)
        .single();

      if (priceError) {
        console.error("Error loading price:", priceError);
        alert("Failed to load price record");
        return;
      }

      setPrice(priceData as MarketPrice);
    };

    if (id) loadData();
  }, [id]);

  // Generic change handler (fully typed)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPrice((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "price" ? Number(value) || 0 : value,
          }
        : null
    );
  };

  const handleUpdate = async () => {
    if (!price) return;

    const { error } = await supabase
      .from("market_prices")
      .update({
        crop_id: price.crop_id,
        location: price.location,
        price: price.price,
        source: price.source,
        date: price.date,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Update failed: " + error.message);
    } else {
      alert("Price updated successfully!");
      router.push("/dashboard/prices");
    }
  };

  if (!price) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Edit Market Price</h1>

      <div className="space-y-4 bg-white p-6 rounded-lg shadow">
        {/* Crop selector */}
        <select
          name="crop_id"
          value={price.crop_id}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Crop --</option>
          {crops.map((crop) => (
            <option key={crop.id} value={crop.id}>
              {crop.name}
            </option>
          ))}
        </select>

        {/* Location */}
        <input
          name="location"
          value={price.location || ""}
          onChange={handleChange}
          placeholder="Location / Market"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Price */}
        <input
          name="price"
          type="number"
          step="0.01"
          value={price.price ?? ""}
          onChange={handleChange}
          placeholder="Price (₹)"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Source */}
        <input
          name="source"
          value={price.source || ""}
          onChange={handleChange}
          placeholder="Source (e.g. Mandi, Website)"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          value={price.date || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit */}
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition"
        >
          Update Price
        </button>
      </div>
    </div>
  );
}
