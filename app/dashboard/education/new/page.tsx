"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Upload, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewEducation() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "article" as "article" | "video" | "story" | "tutorial",
    description: "",
    language: "English",
    content_url: "",
    thumbnail_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    setForm({ ...form, type: value as typeof form.type });
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    setIsSubmitting(true);
    let fileUrl = form.content_url;

    try {
      // Upload file if selected
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 9)}.${fileExt}`;

        const { error } = await supabase.storage
          .from("education")
          .upload(fileName, file);

        if (error) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from("education").getPublicUrl(fileName);

        fileUrl = publicUrl;
        toast.success("File uploaded successfully!");
      }

      // Insert into database
      const { error: dbError } = await supabase
        .from("education_content")
        .insert({
          ...form,
          content_url: fileUrl || null,
        });

      if (dbError) throw dbError;

      toast.success("Education content added successfully!", {
        description: "Redirecting to dashboard...",
      });

      setTimeout(() => router.push("/dashboard/education"), 800);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to save content", {
        description: "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Add Education Content
            </h1>
            <p className="text-muted-foreground">
              Share articles, videos, tutorials, or success stories
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Details</CardTitle>
            <CardDescription>
              Fill in the information below to add new educational material.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. How to Start a Business in 2025"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Content Type</Label>
              <Select value={form.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="story">Success Story</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of the content..."
                rows={4}
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                name="language"
                placeholder="e.g. English, Spanish, Hindi"
                value={form.language}
                onChange={handleChange}
              />
            </div>

            {form.type === "video" && (
              <div className="grid gap-2">
                <Label htmlFor="content_url">
                  YouTube URL (optional for videos)
                </Label>
                <Input
                  id="content_url"
                  name="content_url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={form.content_url}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label>Upload File (PDF, Video, Image, etc.)</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="flex flex-col items-center justify-center pt-6 pb-7">
                    <Upload className="w-12 h-12 mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600 font-medium">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, MP4, JPG, PNG up to 100MB
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept="image/*,video/*,.pdf,.doc,.docx"
                  />
                </label>
              </div>
              {file && (
                <p className="text-sm text-green-600 font-medium">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                  MB)
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-6">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? "Saving..." : "Save Content"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
