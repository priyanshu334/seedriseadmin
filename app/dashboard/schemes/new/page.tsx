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
      alert("Scheme Added!");
      router.push("/dashboard/schemes");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add Scheme</h1>

      <input
        name="title"
        placeholder="Scheme Title"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="state"
        placeholder="Applicable State"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 rounded w-full"
        rows={4}
        onChange={handleChange}
      />

      <textarea
        name="eligibility"
        placeholder="Eligibility Criteria"
        className="border p-2 rounded w-full"
        rows={3}
        onChange={handleChange}
      />

      <textarea
        name="required_docs"
        placeholder="Required Documents"
        className="border p-2 rounded w-full"
        rows={3}
        onChange={handleChange}
      />

      <input
        name="language"
        placeholder="Language (English/Hindi)"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="link"
        placeholder="Official Link"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Saving..." : "Save Scheme"}
      </button>
    </div>
  );
}
