"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    // Note: supabase import removed for artifact demo
    // Replace with your actual Supabase logic
    console.log("Login attempt:", { email, password });

    // Simulated login - replace with actual Supabase call
    if (email && password) {
      alert("Login successful! (Demo mode)");
    } else {
      alert("Please enter email and password");
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Sign in to access your admin dashboard and manage your platform
              with ease.
            </p>
            <div className="mt-12 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-lg">Secure Authentication</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-lg">Fast & Reliable</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Login
              </h1>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </a>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-200"
              >
                Sign In
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Dont have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Contact Administrator
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}
