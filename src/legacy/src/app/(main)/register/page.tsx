"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Corrected import for App Router

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/users", { // Using the existing POST endpoint from /api/users/route.ts
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "member" }), // Default role to member
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage(
          result.message === "User already exists" 
          ? "An account with this email already exists. Please try logging in." 
          : "Registration successful! Please log in."
        );
        // Optionally redirect to login page after a delay or let user click
        // router.push("/account"); 
      } else {
        setError(result.message || result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Registration error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Account</h1>
        {successMessage ? (
          <div className="text-center">
            <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4">{successMessage}</p>
            <Link href="/account" className="font-medium text-ocean-blue-600 hover:text-ocean-blue-500">
              Proceed to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ocean-blue-500 focus:border-ocean-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email-register" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email-register"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ocean-blue-500 focus:border-ocean-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password-register" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password-register"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ocean-blue-500 focus:border-ocean-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ocean-blue-500 focus:border-ocean-blue-500 sm:text-sm"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
        )}
        {!successMessage && (
            <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/account" className="font-medium text-ocean-blue-600 hover:text-ocean-blue-500">
                Sign In
            </Link>
            </p>
        )}
      </div>
    </div>
  );
}

