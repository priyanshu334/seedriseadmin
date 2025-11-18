"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewEducation() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    type: "article",
    description: "",
    language: "English",
    content_url: "",
    thumbnail_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    let fileUrl = form.content_url;

    // Upload file if selected
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("education")
        .upload(fileName, file);

      if (error) {
        alert("Upload failed: " + error.message);
        return;
      }

      fileUrl = supabase.storage.from("education").getPublicUrl(fileName)
        .data.publicUrl;
    }

    const { error } = await supabase.from("education_content").insert({
      ...form,
      content_url: fileUrl,
    });

    if (error) alert(error.message);
    else {
      alert("Content uploaded!");
      router.push("/dashboard/education");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add Education Content</h1>

      <input
        name="title"
        placeholder="Title"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <select
        name="type"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      >
        <option value="article">Article</option>
        <option value="video">Video</option>
        <option value="story">Success Story</option>
        <option value="tutorial">Tutorial</option>
      </select>

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 rounded w-full"
        rows={3}
        onChange={handleChange}
      />

      <input
        name="language"
        placeholder="Language"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      {/* If video → YouTube URL */}
      <input
        name="content_url"
        placeholder="Content URL (YouTube or file link)"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      {/* Or upload a file */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 rounded w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Save Content
      </button>
    </div>
  );
}
