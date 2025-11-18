"use client";

import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEducation() {
  const router = useRouter();
  const { id } = useParams();

  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("education_content")
        .select("*")
        .eq("id", id)
        .single();

      setContent(data);
    };
    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setContent({ ...content, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    let fileUrl = content.content_url;

    // Upload new file if selected
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data } = await supabase.storage
        .from("education")
        .upload(fileName, file);

      fileUrl = supabase.storage.from("education").getPublicUrl(fileName)
        .data.publicUrl;
    }

    const { error } = await supabase
      .from("education_content")
      .update({ ...content, content_url: fileUrl })
      .eq("id", id);

    if (error) alert(error.message);
    else {
      alert("Updated!");
      router.push("/dashboard/education");
    }
  };

  if (!content) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Content</h1>

      <input
        name="title"
        value={content.title}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <select
        name="type"
        className="border p-2 rounded w-full"
        value={content.type}
        onChange={handleChange}
      >
        <option value="article">Article</option>
        <option value="video">Video</option>
        <option value="story">Success Story</option>
        <option value="tutorial">Tutorial</option>
      </select>

      <textarea
        name="description"
        className="border p-2 rounded w-full"
        rows={3}
        value={content.description}
        onChange={handleChange}
      />

      <input
        name="language"
        value={content.language}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        name="content_url"
        value={content.content_url}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 rounded w-full"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Save Changes
      </button>
    </div>
  );
}
