"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewCrop() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    type: "oilseed",
    seed_cost: "",
    fertilizer_cost: "",
    irrigation_cost: "",
    expected_yield: "",
    market_price: "",
    ideal_soil: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const { error } = await supabase.from("crops").insert({
      name: form.name,
      type: form.type,
      seed_cost: Number(form.seed_cost),
      fertilizer_cost: Number(form.fertilizer_cost),
      irrigation_cost: Number(form.irrigation_cost),
      expected_yield: Number(form.expected_yield),
      market_price: Number(form.market_price),
      ideal_soil: form.ideal_soil,
    });

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Crop added successfully!");
      router.push("/dashboard/crops");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Crop</h1>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-medium">Crop Name</label>
          <input
            name="name"
            onChange={handleChange}
            className="border w-full p-2 rounded"
            placeholder="Example: Soybean"
          />
        </div>

        {/* Type */}
        <div>
          <label className="font-medium">Crop Type</label>
          <select
            name="type"
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
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Soil */}
        <div>
          <label className="font-medium">Ideal Soil</label>
          <input
            name="ideal_soil"
            onChange={handleChange}
            className="border w-full p-2 rounded"
            placeholder="Example: Black Soil"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4"
        >
          {loading ? "Saving..." : "Save Crop"}
        </button>
      </div>
    </div>
  );
}
