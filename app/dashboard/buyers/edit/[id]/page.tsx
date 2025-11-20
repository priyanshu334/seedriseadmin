"use client";

import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tractor } from "lucide-react";

// Define the Buyer type based on your Supabase table
interface Buyer {
  id: string;
  name: string;
  district: string;
  crop_needed: string;
  contact: string;
  type: "buyer" | "fpo";
  // Add other fields if they exist in your table
}

export default function EditBuyer() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [buyer, setBuyer] = useState<Buyer | null>(null);

  useEffect(() => {
    const loadBuyer = async () => {
      const { data, error } = await supabase
        .from("buyers")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error loading buyer:", error);
        alert("Failed to load buyer");
        return;
      }

      setBuyer(data as Buyer);
    };

    if (id) loadBuyer();
  }, [id]);

  // Properly typed change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBuyer((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleUpdate = async () => {
    if (!buyer) return;

    const { error } = await supabase
      .from("buyers")
      .update({
        name: buyer.name,
        district: buyer.district,
        crop_needed: buyer.crop_needed,
        contact: buyer.contact,
        type: buyer.type,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Error: " + error.message);
    } else {
      alert("Buyer Updated Successfully!");
      router.push("/dashboard/buyers");
    }
  };

  if (!buyer) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="bg-[#F9F5EB] border-[#D7C8A8] shadow-md rounded-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Tractor size={26} className="text-[#8C6A42]" />
            <CardTitle className="text-2xl font-bold text-[#5A4325]">
              Edit Buyer / FPO
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <input
            name="name"
            className="border border-[#D7C8A8] p-3 rounded w-full bg-white focus:outline-[#6A994E] focus:outline focus:outline-2 focus:outline-offset-2"
            value={buyer.name || ""}
            onChange={handleChange}
            placeholder="Buyer/FPO Name"
          />

          <input
            name="district"
            className="border border-[#D7C8A8] p-3 rounded w-full bg-white focus:outline-[#6A994E] focus:outline focus:outline-2 focus:outline-offset-2"
            value={buyer.district || ""}
            onChange={handleChange}
            placeholder="District"
          />

          <input
            name="crop_needed"
            className="border border-[#D7C8A8] p-3 rounded w-full bg-white focus:outline-[#6A994E] focus:outline focus:outline-2 focus:outline-offset-2"
            value={buyer.crop_needed || ""}
            onChange={handleChange}
            placeholder="Crops Needed"
          />

          <input
            name="contact"
            className="border border-[#D7C8A8] p-3 rounded w-full bg-white focus:outline-[#6A994E] focus:outline focus:outline-2 focus:outline-offset-2"
            value={buyer.contact || ""}
            onChange={handleChange}
            placeholder="Contact Number"
          />

          <select
            name="type"
            className="border border-[#D7C8A8] p-3 rounded w-full bg-white focus:outline-[#6A994E] focus:outline focus:outline-2 focus:outline-offset-2"
            value={buyer.type}
            onChange={handleChange}
          >
            <option value="buyer">Buyer</option>
            <option value="fpo">FPO</option>
          </select>

          <Button
            onClick={handleUpdate}
            className="bg-[#6A994E] hover:bg-[#557D3F] text-white px-4 py-3 rounded w-full font-medium"
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
