"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage(result.message || "If an account with that email exists, a password reset link has been sent.");
      } else {
        setError(result.message || result.error || "Failed to process request. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Forgot password error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Forgot Password</h1>
        {message ? (
          <div className="text-center">
            <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4">{message}</p>
            <Link href="/account" className="font-medium text-ocean-blue-600 hover:text-ocean-blue-500">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-sm text-gray-600">
              Enter the email address associated with your account, and we&apos;ll send you a link to reset your password.
            </p>
            <div>
              <label htmlFor="email-forgot" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email-forgot"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ocean-blue-600 hover:bg-ocean-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue-500 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        )}
        {!message && (
            <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link href="/account" className="font-medium text-coral-600 hover:text-coral-500">
                Sign In
            </Link>
            </p>
        )}
      </div>
    </div>
  );
}

