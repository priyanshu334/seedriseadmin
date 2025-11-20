"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactAdminPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !phone || !message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    // OPTIONAL: Save request to Supabase DB table e.g. "admin_requests"
    const { error } = await supabase.from("admin_requests").insert([
      {
        name,
        email,
        phone,
        message,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert("Request sent to admin successfully!");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F5F2E9] p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 border border-green-200">
        <h1 className="text-3xl font-bold text-green-900 mb-3 text-center">
          Contact Administrator
        </h1>
        <p className="text-green-700 text-center mb-8">
          Request login credentials to access the farm dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-green-800 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-green-300 bg-green-50 focus:ring-2 focus:ring-green-700 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-green-800 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-3 rounded-lg border border-green-300 bg-green-50 focus:ring-2 focus:ring-green-700 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-green-800 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="9876543210"
              className="w-full px-4 py-3 rounded-lg border border-green-300 bg-green-50 focus:ring-2 focus:ring-green-700 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-green-800 mb-2">
              Message
            </label>
            <textarea
              placeholder="Why do you need access?"
              className="w-full px-4 py-3 rounded-lg border border-green-300 bg-green-50 focus:ring-2 focus:ring-green-700 outline-none"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 focus:ring-4 focus:ring-green-300 transition duration-200"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </form>

        <p className="text-center text-xs text-green-600 mt-6">
          Admin will reach out to you soon 🌱
        </p>
      </div>
    </div>
  );
}
