"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tractor } from "lucide-react";

export default function NewBuyer() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    district: "",
    crop_needed: "",
    contact: "",
    type: "buyer",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const { error } = await supabase.from("buyers").insert(form);

    if (error) alert(error.message);
    else {
      alert("Buyer/FPO Added!");
      router.push("/dashboard/buyers");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="bg-[#F9F5EB] border-[#D7C8A8] shadow-md rounded-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Tractor size={26} className="text-[#8C6A42]" />
            <CardTitle className="text-2xl font-bold text-[#5A4325]">
              Add Buyer / FPO
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <input
            name="name"
            placeholder="Buyer/FPO Name"
            className="border border-[#D7C8A8] p-3 rounded w-full bg-white focus:outline-[#6A994E]"
            onChange={handleChange}
          />

          <input
            name="district"
            placeholder="District"
            className="border border-[#D7C8A8] p-3 rounded w-full bg-white focus:outline-[#6A994E]"
            onChange={handleChange}
          />

          <input
            name="crop_needed"
            placeholder="Crops Needed"
            className="border border-[#D7C8A8] p-3 rounded w-full bg-white focus:outline-[#6A994E]"
            onChange={handleChange}
          />

          <input
            name="contact"
            placeholder="Contact Number"
            className="border border-[#D7C8A8] p-3 rounded w-full bg-white focus:outline-[#6A994E]"
            onChange={handleChange}
          />

          <select
            name="type"
            className="border border-[#D7C8A8] p-3 rounded w-full bg-white focus:outline-[#6A994E]"
            onChange={handleChange}
          >
            <option value="buyer">Buyer</option>
            <option value="fpo">FPO</option>
          </select>

          <Button
            onClick={handleSubmit}
            className="bg-[#6A994E] hover:bg-[#557D3F] text-white px-4 py-3 rounded w-full"
          >
            Save Buyer / FPO
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
