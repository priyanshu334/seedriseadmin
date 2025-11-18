"use client";

import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditScheme() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [scheme, setScheme] = useState<any>(null);

  useEffect(() => {
    const fetchScheme = async () => {
      const { data } = await supabase
        .from("schemes")
        .select("*")
        .eq("id", id)
        .single();

      setScheme(data);
    };

    fetchScheme();
  }, [id]);

  const handleChange = (e: any) =>
    setScheme({ ...scheme, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("schemes")
      .update(scheme)
      .eq("id", id);

    setLoading(false);

    if (error) alert(error.message);
    else {
      alert("Updated!");
      router.push("/dashboard/schemes");
    }
  };

  if (!scheme) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Scheme</h1>

      <input
        name="title"
        value={scheme.title}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="state"
        value={scheme.state}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <textarea
        name="description"
        value={scheme.description}
        className="border p-2 rounded w-full"
        rows={4}
        onChange={handleChange}
      />

      <textarea
        name="eligibility"
        value={scheme.eligibility}
        className="border p-2 rounded w-full"
        rows={3}
        onChange={handleChange}
      />

      <textarea
        name="required_docs"
        value={scheme.required_docs}
        className="border p-2 rounded w-full"
        rows={3}
        onChange={handleChange}
      />

      <input
        name="language"
        value={scheme.language}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="link"
        value={scheme.link}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Updating..." : "Update Scheme"}
      </button>
    </div>
  );
}
