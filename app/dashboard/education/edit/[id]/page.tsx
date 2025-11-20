"use client";

import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

// Define the shape of your education content
interface EducationContent {
  id: string;
  title: string;
  type: "article" | "video" | "story" | "tutorial";
  description: string;
  language: string;
  content_url: string;
  created_at?: string;
}

export default function EditEducation() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<EducationContent | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing content
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("education_content")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        alert("डेटा लोड नहीं हो सका।");
      } else {
        setContent(data as EducationContent);
      }
    };

    fetchData();
  }, [id]);

  // Generic change handler with proper typing
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!content) return;

    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleUpdate = async () => {
    if (!content) return;

    setLoading(true);
    let fileUrl = content.content_url;

    // Upload new file if user selected one
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("education")
        .upload(fileName, file);

      if (uploadError) {
        setLoading(false);
        alert("फाइल अपलोड में त्रुटि: " + uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("education")
        .getPublicUrl(fileName);

      fileUrl = urlData.publicUrl;
    }

    // Update row in database
    const { error } = await supabase
      .from("education_content")
      .update({
        title: content.title,
        type: content.type,
        description: content.description,
        language: content.language,
        content_url: fileUrl,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert("अपडेट करने में त्रुटि: " + error.message);
    } else {
      alert("सामग्री सफलतापूर्वक अपडेट हुई!");
      router.push("/dashboard/education");
    }
  };

  if (!content) {
    return (
      <div className="p-6 text-center text-[#6b4a21] font-medium">
        लोड हो रहा है...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card className="bg-[#F9F5EB] border-[#D7C8A8] shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#8C6A42] to-[#6A994E] text-white">
          <div className="flex items-center gap-3">
            <BookOpen size={28} />
            <CardTitle className="text-2xl font-bold">
              शिक्षा सामग्री संपादित करें
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block font-semibold text-[#5A4325] mb-2">
              शीर्षक
            </label>
            <input
              name="title"
              value={content.title || ""}
              onChange={handleChange}
              placeholder="सामग्री का शीर्षक"
              className="w-full p-3 border border-[#D7C8A8] rounded-lg bg-white focus:ring-2 focus:ring-[#6A994E] focus:border-transparent transition"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block font-semibold text-[#5A4325] mb-2">
              प्रकार
            </label>
            <select
              name="type"
              value={content.type}
              onChange={handleChange}
              className="w-full p-3 border border-[#D7C8A8] rounded-lg bg-white focus:ring-2 focus:ring-[#6A994E]"
            >
              <option value="article">लेख (Article)</option>
              <option value="video">वीडियो (Video)</option>
              <option value="story">सफलता की कहानी</option>
              <option value="tutorial">ट्यूटोरियल</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-[#5A4325] mb-2">
              विवरण
            </label>
            <textarea
              name="description"
              value={content.description || ""}
              onChange={handleChange}
              rows={5}
              placeholder="यहाँ सामग्री का संक्षिप्त विवरण लिखें..."
              className="w-full p-3 border border-[#D7C8A8] rounded-lg bg-white resize-none focus:ring-2 focus:ring-[#6A994E]"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block font-semibold text-[#5A4325] mb-2">
              भाषा
            </label>
            <input
              name="language"
              value={content.language || ""}
              onChange={handleChange}
              placeholder="उदा.: हिंदी, English"
              className="w-full p-3 border border-[#D7C8A8] rounded-lg bg-white focus:ring-2 focus:ring-[#6A994E]"
            />
          </div>

          {/* Current URL (shown for reference) */}
          <div>
            <label className="block font-semibold text-[#5A4325] mb-2">
              वर्तमान URL
            </label>
            <input
              value={content.content_url}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* File Upload - Optional new file */}
          <div>
            <label className="block font-semibold text-[#5A4325] mb-2">
              नई फाइल अपलोड करें (वैकल्पिक)
            </label>
            <input
              type="file"
              accept="image/*,video/*,.pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-3 border border-dashed border-[#D7C8A8] rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#6A994E] file:text-white hover:file:bg-[#557D3F]"
            />
            {file && (
              <p className="mt-2 text-sm text-green-600">
                चुनी गई फाइल: {file.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-[#6A994E] hover:bg-[#557D3F] text-white font-bold py-4 text-lg rounded-xl shadow-lg transition disabled:opacity-70"
          >
            {loading ? "सहेजा जा रहा..." : "सामग्री अपडेट करें"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
