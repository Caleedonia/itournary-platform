"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; // Corrected import for App Router

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string; // Get token from URL path

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null); // null: checking, true: valid, false: invalid

  useEffect(() => {
    // Optional: Validate token on page load (or rely on API to validate during submission)
    // For a better UX, you might want to make a quick API call here to check if the token is valid
    // and not expired before showing the form. For simplicity, we'll validate on submit for now.
    if (token) {
        setIsValidToken(true); // Assume valid until submission, or add a pre-check API call
    } else {
        setError("Invalid or missing password reset token.");
        setIsValidToken(false);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Invalid or missing password reset token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage(result.message || "Password has been reset successfully! You can now log in with your new password.");
        // Optionally redirect to login page after a delay
        setTimeout(() => router.push("/account"), 3000);
      } else {
        setError(result.message || result.error || "Failed to reset password. The link may be invalid or expired.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Reset password error:", err);
    }
    setLoading(false);
  };

  if (isValidToken === null && token) {
    return <div className="container mx-auto px-4 py-12 text-center"><p>Verifying reset link...</p></div>;
  }
  
  if (isValidToken === false) {
     return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Invalid Link</h1>
                <p className="text-red-600 bg-red-100 p-3 rounded-md mb-6">{error || "This password reset link is invalid or has expired."}</p>
                <Link href="/forgot-password" className="font-medium text-ocean-blue-600 hover:text-ocean-blue-500">
                Request a new reset link
                </Link>
            </div>
        </div>
     );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Reset Your Password</h1>
        {message ? (
          <div className="text-center">
            <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4">{message}</p>
            <Link href="/account" className="font-medium text-ocean-blue-600 hover:text-ocean-blue-500">
              Proceed to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="new-password"
                name="newPassword"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ocean-blue-500 focus:border-ocean-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                id="confirm-new-password"
                name="confirmNewPassword"
                type="password"
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
                disabled={loading || !token}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 disabled:opacity-50"
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

