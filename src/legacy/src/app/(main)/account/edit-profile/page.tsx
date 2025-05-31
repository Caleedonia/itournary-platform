"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Corrected import for App Router

export default function EditProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Email display, not editable for now
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    } else if (status === "unauthenticated") {
      router.push("/account"); // Redirect to login if not authenticated
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/users/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully!");
        // Update the session with the new name
        await updateSession({ ...session, user: { ...session?.user, name } });
        // Optionally redirect or give feedback
      } else {
        setError(result.error || "Failed to update profile.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Profile update error:", err);
    }
    setIsLoading(false);
  };

  if (status === "loading" || !session?.user) {
    return <div className="container mx-auto px-4 py-12 text-center"><p>Loading...</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email-display" className="block text-sm font-medium text-gray-700">
              Email (cannot be changed)
            </label>
            <input
              id="email-display"
              type="email"
              value={email}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
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

          {message && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">{message}</p>}
          {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ocean-blue-600 hover:bg-ocean-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
         <button 
            onClick={() => router.back()}
            className="w-full mt-4 text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue-500"
        >
            Back to Account
        </button>
      </div>
    </div>
  );
}

