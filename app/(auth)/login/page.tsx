"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert("Login successful!");
    router.push("/dashboard");
  }

  return (
    <div className="flex h-screen">
      {/* Left Side - Farm Style Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-800 via-lime-700 to-yellow-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6">Welcome Back, Farmer</h2>
            <p className="text-xl text-lime-100 leading-relaxed">
              Sign in and manage your crops, field data, and farm analytics
              seamlessly.
            </p>

            <div className="mt-12 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2A9 9 0 110 12a9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-lg">Secure Login</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l18 0M12 21V3"
                    />
                  </svg>
                </div>
                <span className="text-lg">Fast & Reliable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative lights like village lantern */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-200 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-400 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-[#F5F2E9] p-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-200">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-900 mb-2">
                Farmer Login
              </h1>
              <p className="text-green-700">
                Enter your details to enter your farm dashboard
              </p>
            </div>

            <div className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-green-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="farmer@example.com"
                  className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition bg-green-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-green-800 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition bg-green-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Remember */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-700 border-green-400 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-green-700">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-green-700 hover:text-green-900 font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                onClick={handleLogin}
                className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 focus:ring-4 focus:ring-green-300 transition duration-200"
              >
                Sign In
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-green-700">
              Dont have an account?{" "}
              <a
                href="/contactadmin"
                className="text-green-900 font-semibold hover:underline"
              >
                Contact Admin
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-green-600 mt-6">
            Secured with modern technology 🌾
          </p>
        </div>
      </div>
    </div>
  );
}
