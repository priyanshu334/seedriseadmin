"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

export default function EditCrop() {
  const router = useRouter();
  const params = useParams();
  const cropId = params.id;

  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState<any>(null);

  // Fetch existing crop
  useEffect(() => {
    const fetchCrop = async () => {
      const { data } = await supabase
        .from("crops")
        .select("*")
        .eq("id", cropId)
        .single();
      setCrop(data);
    };
    fetchCrop();
  }, [cropId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCrop({ ...crop, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("crops")
      .update({
        name: crop.name,
        type: crop.type,
        seed_cost: Number(crop.seed_cost),
        fertilizer_cost: Number(crop.fertilizer_cost),
        irrigation_cost: Number(crop.irrigation_cost),
        expected_yield: Number(crop.expected_yield),
        market_price: Number(crop.market_price),
        ideal_soil: crop.ideal_soil,
      })
      .eq("id", cropId);

    setLoading(false);

    if (error) {
      alert("Error updating: " + error.message);
    } else {
      alert("Crop updated successfully!");
      router.push("/dashboard/crops");
    }
  };

  if (!crop) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Crop</h1>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-medium">Crop Name</label>
          <input
            name="name"
            value={crop.name}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Type */}
        <div>
          <label className="font-medium">Crop Type</label>
          <select
            name="type"
            value={crop.type}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          >
            <option value="oilseed">Oilseed</option>
            <option value="cereal">Cereal</option>
            <option value="vegetable">Vegetable</option>
          </select>
        </div>

        {/* Seed Cost */}
        <div>
          <label className="font-medium">Seed Cost (per acre)</label>
          <input
            name="seed_cost"
            type="number"
            value={crop.seed_cost}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Fertilizer Cost */}
        <div>
          <label className="font-medium">Fertilizer Cost (per acre)</label>
          <input
            name="fertilizer_cost"
            type="number"
            value={crop.fertilizer_cost}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Irrigation Cost */}
        <div>
          <label className="font-medium">Irrigation Cost (per acre)</label>
          <input
            name="irrigation_cost"
            type="number"
            value={crop.irrigation_cost}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Yield */}
        <div>
          <label className="font-medium">Expected Yield (kg per acre)</label>
          <input
            name="expected_yield"
            type="number"
            value={crop.expected_yield}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Market Price */}
        <div>
          <label className="font-medium">Market Price (₹ per kg)</label>
          <input
            name="market_price"
            type="number"
            value={crop.market_price}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Soil */}
        <div>
          <label className="font-medium">Ideal Soil</label>
          <input
            name="ideal_soil"
            value={crop.ideal_soil}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Crop"}
        </button>
      </div>
    </div>
  );
}
