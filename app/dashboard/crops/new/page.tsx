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
      alert("🌾 Crop added successfully!");
      router.push("/dashboard/crops");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-[#fffaf3] border border-[#d8c7a4] rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-extrabold text-[#7a5a23] mb-6">
          🌿 Add New Crop
        </h1>

        <div className="space-y-4">
          {/* Crop Name */}
          <div>
            <label className="font-semibold text-[#6b4a21]">Crop Name</label>
            <input
              name="name"
              onChange={handleChange}
              className="border border-[#c8b58d] w-full p-2 rounded mt-1 bg-white text-[#5a431d]"
              placeholder="Example: Soybean"
            />
          </div>

          {/* Type */}
          <div>
            <label className="font-semibold text-[#6b4a21]">Crop Type</label>
            <select
              name="type"
              onChange={handleChange}
              className="border border-[#c8b58d] w-full p-2 rounded mt-1 bg-white text-[#5a431d]"
            >
              <option value="oilseed">Oilseed</option>
              <option value="cereal">Cereal</option>
              <option value="vegetable">Vegetable</option>
              <option value="pulse">Pulse</option>
              <option value="fruit">Fruit</option>
            </select>
          </div>

          {/* Seed Cost */}
          <div>
            <label className="font-semibold text-[#6b4a21]">
              Seed Cost (per acre)
            </label>
            <input
              name="seed_cost"
              type="number"
              onChange={handleChange}
              className="border border-[#c8b58d] w-full p-2 rounded mt-1 bg-white text-[#5a431d]"
            />
          </div>

          {/* Fertilizer Cost */}
          <div>
            <label className="font-semibold text-[#6b4a21]">
              Fertilizer Cost (per acre)
            </label>
            <input
              name="fertilizer_cost"
              type="number"
              onChange={handleChange}
              className="border border-[#c8b58d] w-full p-2 rounded mt-1 bg-white text-[#5a431d]"
            />
          </div>

          {/* Irrigation Cost */}
          <div>
            <label className="font-semibold text-[#6b4a21]">
              Irrigation Cost (per acre)
            </label>
            <input
              name="irrigation_cost"
              type="number"
              onChange={handleChange}
              className="border border-[#c8b58d] w-full p-2 rounded mt-1 bg-white text-[#5a431d]"
            />
          </div>

          {/* Expected Yield */}
          <div>
            <label className="font-semibold text-[#6b4a21]">
              Expected Yield (kg per acre)
            </label>
            <input
              name="expected_yield"
              type="number"
              onChange={handleChange}
              className="border border-[#c8b58d] w-full p-2 rounded mt-1 bg-white text-[#5a431d]"
            />
          </div>

          {/* Market Price */}
          <div>
            <label className="font-semibold text-[#6b4a21]">
              Market Price (₹ per kg)
            </label>
            <input
              name="market_price"
              type="number"
              onChange={handleChange}
              className="border border-[#c8b58d] w-full p-2 rounded mt-1 bg-white text-[#5a431d]"
            />
          </div>

          {/* Soil Type */}
          <div>
            <label className="font-semibold text-[#6b4a21]">Ideal Soil</label>
            <input
              name="ideal_soil"
              onChange={handleChange}
              className="border border-[#c8b58d] w-full p-2 rounded mt-1 bg-white text-[#5a431d]"
              placeholder="Example: Black Soil"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#8b5e2e] hover:bg-[#6c471f] text-white font-semibold px-4 py-3 rounded-lg w-full mt-4 transition"
          >
            {loading ? "Saving..." : "🌾 Save Crop"}
          </button>
        </div>
      </div>
    </div>
  );
}
