// /home/ubuntu/paradise-partners-project/paradise-partners-frontend/src/app/(main)/account/itineraries/new/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting after creation
import { useSession } from "next-auth/react";

export default function NewItineraryPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destinations, setDestinations] = useState(""); // Simple comma-separated string for now
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (status !== "authenticated") {
      setError("You must be logged in to create an itinerary.");
      setIsSubmitting(false);
      return;
    }

    if (!name.trim()) {
        setError("Itinerary name is required.");
        setIsSubmitting(false);
        return;
    }

    try {
      const response = await fetch("/api/itineraries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          startDate: startDate || null, // Send null if empty
          endDate: endDate || null, // Send null if empty
          destinations: destinations.split(",").map(d => d.trim()).filter(d => d), // Split and trim
          items: [], // Start with an empty items array
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create itinerary");
      }

      const newItinerary = await response.json();
      router.push(`/account/itineraries/${newItinerary._id}`); // Redirect to the new itinerary detail page
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="container mx-auto px-4 py-8 text-center">Please log in to create an itinerary.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-ocean-blue-700 mb-8">Create New Itinerary</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Itinerary Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">Start Date (Optional)</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">End Date (Optional)</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="destinations" className="block text-sm font-medium text-slate-700 mb-1">Destinations (Optional, comma-separated)</label>
          <input
            type="text"
            id="destinations"
            value={destinations}
            onChange={(e) => setDestinations(e.target.value)}
            placeholder="e.g., Paris, Rome, Barcelona"
            className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
          />
        </div>

        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={() => router.back()} // Or router.push("/account/itineraries")
            className="mr-3 py-2 px-4 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2 px-6 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-600 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Creating..." : "Create Itinerary"}
          </button>
        </div>
      </form>
    </div>
  );
}

