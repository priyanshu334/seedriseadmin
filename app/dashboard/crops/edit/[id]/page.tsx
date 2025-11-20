"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

// Define the Crop type (reuse this across your app!)
interface Crop {
  id: string;
  name: string;
  type: "oilseed" | "cereal" | "vegetable" | "pulse" | "fruit";
  seed_cost: number;
  fertilizer_cost: number;
  irrigation_cost: number;
  expected_yield: number;
  market_price: number;
  ideal_soil: string;
  created_at?: string;
  user_id?: string;
}

export default function EditCrop() {
  const router = useRouter();
  const params = useParams();
  const cropId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState<Crop | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch crop data
  useEffect(() => {
    const fetchCrop = async () => {
      if (!cropId) return;

      setFetchLoading(true);
      const { data, error } = await supabase
        .from("crops")
        .select("*")
        .eq("id", cropId)
        .single();

      if (error) {
        console.error("Error fetching crop:", error);
        alert("फसल की जानकारी लोड नहीं हो सकी।");
      } else if (data) {
        setCrop(data as Crop);
      }
      setFetchLoading(false);
    };

    fetchCrop();
  }, [cropId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!crop) return;

    const { name, value } = e.target;
    setCrop({
      ...crop,
      [name]:
        name.includes("cost") ||
        name.includes("yield") ||
        name.includes("price")
          ? Number(value) || 0
          : value,
    });
  };

  const handleUpdate = async () => {
    if (!crop) return;

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
      alert("अपडेट करने में त्रुटि: " + error.message);
    } else {
      alert("फसल सफलतापूर्वक अपडेट हुई!");
      router.push("/dashboard/crops");
    }
  };

  // Loading state
  if (fetchLoading) {
    return (
      <div className="p-6 text-center text-[#6b4a21] font-medium">
        फसल की जानकारी लोड हो रही है...
      </div>
    );
  }

  // Not found
  if (!crop) {
    return (
      <div className="p-6 text-center text-red-600 font-bold">
        फसल नहीं मिली।
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-[#fffaf3] border border-[#d8c7a4] rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-[#7a5a23] mb-8 text-center">
          Edit Crop
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-[#6b4a21]">फसल का नाम</label>
            <input
              name="name"
              value={crop.name || ""}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-[#c8b58d] rounded-lg bg-white text-[#5a431d] focus:ring-2 focus:ring-[#8b5e2e] focus:outline-none"
              placeholder="जैसे: गेहूं, कपास"
            />
          </div>

          <div>
            <label className="font-semibold text-[#6b4a21]">
              फसल का प्रकार
            </label>
            <select
              name="type"
              value={crop.type}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-[#c8b58d] rounded-lg bg-white text-[#5a431d]"
            >
              <option value="cereal">अनाज (Cereal)</option>
              <option value="pulse">दाल (Pulse)</option>
              <option value="oilseed">तिलहन (Oilseed)</option>
              <option value="vegetable">सब्जी (Vegetable)</option>
              <option value="fruit">फल (Fruit)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#6b4a21]">
              बीज लागत (₹/एकड़)
            </label>
            <input
              name="seed_cost"
              type="number"
              value={crop.seed_cost || ""}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-[#6b4a21]">
              खाद लागत (₹/एकड़)
            </label>
            <input
              name="fertilizer_cost"
              type="number"
              value={crop.fertilizer_cost || ""}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-[#6b4a21]">
              सिंचाई लागत (₹/एकड़)
            </label>
            <input
              name="irrigation_cost"
              type="number"
              value={crop.irrigation_cost || ""}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-[#6b4a21]">
              उम्मीद पैदावार (किग्रा/एकड़)
            </label>
            <input
              name="expected_yield"
              type="number"
              value={crop.expected_yield || ""}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-[#6b4a21]">
              बाजार मूल्य (₹/किग्रा)
            </label>
            <input
              name="market_price"
              type="number"
              value={crop.market_price || ""}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-[#6b4a21]">
              उपयुक्त मिट्टी
            </label>
            <input
              name="ideal_soil"
              value={crop.ideal_soil || ""}
              onChange={handleChange}
              placeholder="जैसे: काली, दोमट, रेतीली"
              className="mt-1 w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-8 w-full bg-[#8b5e2e] hover:bg-[#6c471f] disabled:bg-gray-400 text-white font-bold py-4 rounded-xl text-lg transition shadow-lg"
        >
          {loading ? "अपडेट हो रहा..." : "Update Crop"}
        </button>
      </div>
    </div>
  );
}
