// /home/ubuntu/paradise-partners-project/paradise-partners-frontend/src/app/(main)/account/itineraries/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline"; // Example icon

interface IItineraryItem {
  itemType: "Resort" | "Service" | "Note";
  itemId?: string;
  itemName?: string;
  itemDescription?: string;
  startDate?: Date;
  endDate?: Date;
}

interface IItinerary {
  _id: string;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  destinations?: string[];
  items: IItineraryItem[];
  createdAt: Date;
}

export default function ItinerariesPage() {
  const { data: session, status } = useSession();
  const [itineraries, setItineraries] = useState<IItinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchItineraries();
    } else if (status === "unauthenticated") {
      // Redirect or show message if not logged in, handled by middleware or page logic
      setIsLoading(false);
      setError("You need to be logged in to view your itineraries.");
    }
  }, [status]);

  const fetchItineraries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/itineraries");
      if (!response.ok) {
        throw new Error(`Failed to fetch itineraries: ${response.statusText}`);
      }
      const data = await response.json();
      setItineraries(data);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading your itineraries...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
        {status !== "authenticated" && (
          <Link href="/api/auth/signin"
            className="mt-4 inline-block bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
            Login
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-ocean-blue-700">My Itineraries</h1>
        <Link href="/account/itineraries/new"
          className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          <PlusCircleIcon className="h-5 w-5" />
          Create New Itinerary
        </Link>
      </div>

      {itineraries.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No itineraries yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new itinerary.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <div key={itinerary._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-ocean-blue-600 mb-2 truncate">{itinerary.name}</h2>
                <p className="text-sm text-slate-500 mb-1">
                  {itinerary.startDate ? new Date(itinerary.startDate).toLocaleDateString() : "No start date"} -
                  {itinerary.endDate ? new Date(itinerary.endDate).toLocaleDateString() : "No end date"}
                </p>
                <p className="text-sm text-slate-600 mb-3 truncate h-10">
                  {itinerary.description || "No description provided."}
                </p>
                <div className="flex justify-end">
                  <Link href={`/account/itineraries/${itinerary._id}`}
                    className="text-coral-600 hover:text-coral-700 font-medium text-sm">
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

