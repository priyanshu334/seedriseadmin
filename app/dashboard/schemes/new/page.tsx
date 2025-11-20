"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewScheme() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    state: "",
    description: "",
    eligibility: "",
    required_docs: "",
    language: "English",
    link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);

    const { error } = await supabase.from("schemes").insert(form);

    setLoading(false);

    if (error) alert(error.message);
    else {
      alert("🌾 Scheme Added Successfully!");
      router.push("/dashboard/schemes");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-[#f8f3e8] min-h-screen rounded-xl shadow-md border">
      <h1 className="text-3xl font-bold text-green-800 mb-4">
        🌿 Add New Government Scheme
      </h1>

      <div className="space-y-4">
        <input
          name="title"
          placeholder="Scheme Title"
          className="border p-3 rounded w-full bg-white focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
        />

        <input
          name="state"
          placeholder="Applicable State"
          className="border p-3 rounded w-full bg-white focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-3 rounded w-full bg-white focus:ring-2 focus:ring-green-400"
          rows={4}
          onChange={handleChange}
        />

        <textarea
          name="eligibility"
          placeholder="Eligibility Criteria"
          className="border p-3 rounded w-full bg-white focus:ring-2 focus:ring-green-400"
          rows={3}
          onChange={handleChange}
        />

        <textarea
          name="required_docs"
          placeholder="Required Documents"
          className="border p-3 rounded w-full bg-white focus:ring-2 focus:ring-green-400"
          rows={3}
          onChange={handleChange}
        />

        <input
          name="language"
          placeholder="Language (English/Hindi)"
          className="border p-3 rounded w-full bg-white focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
        />

        <input
          name="link"
          placeholder="Official Link"
          className="border p-3 rounded w-full bg-white focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded w-full font-medium shadow"
        >
          {loading ? "Saving..." : "Save Scheme"}
        </button>
      </div>
    </div>
  );
}
