"use client";

import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define the exact shape of a scheme from your Supabase "schemes" table
interface Scheme {
  id: string;
  title: string;
  state: string;
  description: string;
  eligibility: string;
  required_docs: string;
  language: string;
  link: string;
  // Add any other fields if present in your table
}

export default function EditScheme() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [scheme, setScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    const fetchScheme = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("schemes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching scheme:", error);
        alert("Failed to load scheme");
        return;
      }

      setScheme(data);
    };

    fetchScheme();
  }, [id]);

  // Properly typed change handler for input, textarea, and select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setScheme((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleUpdate = async () => {
    if (!scheme) return;

    setLoading(true);

    const { error } = await supabase
      .from("schemes")
      .update({
        title: scheme.title,
        state: scheme.state,
        description: scheme.description,
        eligibility: scheme.eligibility,
        required_docs: scheme.required_docs,
        language: scheme.language,
        link: scheme.link,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Update failed: " + error.message);
    } else {
      alert("Scheme Updated Successfully!");
      router.push("/dashboard/schemes");
    }
  };

  if (!scheme) {
    return (
      <div className="p-8 text-center text-gray-600 text-lg">
        Loading scheme details...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-[#f8f3e8] min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-amber-100 p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Edit Government Scheme
        </h1>

        <div className="space-y-6">
          <input
            name="title"
            value={scheme.title || ""}
            onChange={handleChange}
            placeholder="Scheme Title"
            className="w-full border border-amber-200 p-4 rounded-lg bg-white focus:ring-4 focus:ring-green-500 focus:border-green-500 transition"
          />

          <input
            name="state"
            value={scheme.state || ""}
            onChange={handleChange}
            placeholder="State (e.g. Karnataka, National)"
            className="w-full border border-amber-200 p-4 rounded-lg bg-white focus:ring-4 focus:ring-green-500 focus:border-green-500 transition"
          />

          <textarea
            name="description"
            value={scheme.description || ""}
            onChange={handleChange}
            rows={5}
            placeholder="Full description of the scheme..."
            className="w-full border border-amber-200 p-4 rounded-lg bg-white focus:ring-4 focus:ring-green-500 focus:border-green-500 transition resize-none"
          />

          <textarea
            name="eligibility"
            value={scheme.eligibility || ""}
            onChange={handleChange}
            rows={4}
            placeholder="Who is eligible? (e.g. small farmers, women farmers...)"
            className="w-full border border-amber-200 p-4 rounded-lg bg-white focus:ring-4 focus:ring-green-500 focus:border-green-500 transition resize-none"
          />

          <textarea
            name="required_docs"
            value={scheme.required_docs || ""}
            onChange={handleChange}
            rows={4}
            placeholder="Required documents (Aadhaar, land records, bank passbook...)"
            className="w-full border border-amber-200 p-4 rounded-lg bg-white focus:ring-4 focus:ring-green-500 focus:border-green-500 transition resize-none"
          />

          <input
            name="language"
            value={scheme.language || ""}
            onChange={handleChange}
            placeholder="Language (e.g. English, Kannada, Hindi)"
            className="w-full border border-amber-200 p-4 rounded-lg bg-white focus:ring-4 focus:ring-green-500 focus:border-green-500 transition"
          />

          <input
            name="link"
            value={scheme.link || ""}
            onChange={handleChange}
            placeholder="Official Link[](https://...)"
            className="w-full border border-amber-200 p-4 rounded-lg bg-white focus:ring-4 focus:ring-green-500 focus:border-green-500 transition"
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`w-full py-4 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Updating Scheme..." : "Update Scheme"}
          </button>
        </div>
      </div>
    </div>
  );
}
