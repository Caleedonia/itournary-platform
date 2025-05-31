// /home/ubuntu/paradise-partners-project/paradise-partners-frontend/src/app/(main)/account/itineraries/[itineraryId]/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; // For accessing route params and navigation
import { useSession } from "next-auth/react";
import { PortableText } from "@portabletext/react"; // If descriptions use Portable Text
import { ArrowLeftIcon, PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

// Interfaces (should match your Itinerary model)
interface IItineraryItem {
  _id?: string; // MongoDB assigns _id to subdocuments too
  itemType: "Resort" | "Service" | "Note";
  itemId?: string;
  itemName?: string;
  itemDescription?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  customOrder?: number;
}

interface IItinerary {
  _id: string;
  name: string;
  description?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  destinations?: string[];
  items: IItineraryItem[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export default function ItineraryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const itineraryId = params.itineraryId as string;
  const { data: session, status } = useSession();

  const [itinerary, setItinerary] = useState<IItinerary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false); // For future inline editing
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const fetchItineraryDetails = useCallback(async () => {
    if (!itineraryId || status !== "authenticated") {
      if (status === "unauthenticated") setError("Please log in to view this itinerary.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/itineraries/${itineraryId}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to fetch itinerary details");
      }
      const data: IItinerary = await response.json();
      setItinerary(data);
      setEditedName(data.name);
      setEditedDescription(data.description || "");
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [itineraryId, status]);

  useEffect(() => {
    fetchItineraryDetails();
  }, [fetchItineraryDetails]);

  const handleDeleteItinerary = async () => {
    if (!itineraryId || !confirm("Are you sure you want to delete this itinerary?")) return;

    try {
      const response = await fetch(`/api/itineraries/${itineraryId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete itinerary");
      }
      router.push("/account/itineraries");
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
      // Potentially show a toast notification for the error
    }
  };
  
  const handleUpdateItineraryDetails = async () => {
    if (!itineraryId) return;
    setIsLoading(true);
    try {
        const response = await fetch(`/api/itineraries/${itineraryId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: editedName, description: editedDescription }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update itinerary");
        }
        const updatedItinerary = await response.json();
        setItinerary(updatedItinerary);
        setEditMode(false);
    } catch (err) {
        console.error(err);
        setError((err as Error).message);
    } finally {
        setIsLoading(false);
    }
  };

  // Placeholder for adding/editing/deleting items - to be implemented
  const handleAddItem = () => alert("Add item functionality to be implemented.");
  const handleEditItem = (itemId: string) => alert(`Edit item ${itemId} functionality to be implemented.`);
  const handleDeleteItem = (itemId: string) => alert(`Delete item ${itemId} functionality to be implemented.`);

  if (isLoading && !itinerary) { // Show loading only if itinerary is not yet fetched
    return <div className="container mx-auto px-4 py-8 text-center">Loading itinerary details...</div>;
  }

  if (error && !itinerary) { // Show error only if itinerary is not yet fetched and there's an error
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
        <Link href="/account/itineraries"
          className="mt-4 inline-block bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Back to Itineraries
        </Link>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-slate-600">Itinerary not found or you do not have access.</p>
        <Link href="/account/itineraries"
          className="mt-4 inline-block bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Back to Itineraries
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/account/itineraries" className="inline-flex items-center text-ocean-blue-600 hover:text-ocean-blue-700">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to My Itineraries
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl mb-8">
        {!editMode ? (
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-ocean-blue-700 mb-2">{itinerary.name}</h1>
              {itinerary.description && <p className="text-slate-600 mb-1 text-sm sm:text-base">{itinerary.description}</p>}
              <p className="text-xs text-slate-400">
                Created: {new Date(itinerary.createdAt).toLocaleDateString()} | Last Updated: {new Date(itinerary.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
                <button 
                    onClick={() => { setEditMode(true); setEditedName(itinerary.name); setEditedDescription(itinerary.description || ""); }}
                    className="p-2 text-slate-500 hover:text-ocean-blue-600 transition-colors"
                    title="Edit Itinerary Details"
                >
                    <PencilIcon className="h-5 w-5" />
                </button>
                <button 
                    onClick={handleDeleteItinerary}
                    className="p-2 text-slate-500 hover:text-red-600 transition-colors"
                    title="Delete Itinerary"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-3">Edit Itinerary Details</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="editedName" className="block text-sm font-medium text-slate-700">Name</label>
                    <input type="text" id="editedName" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500" />
                </div>
                <div>
                    <label htmlFor="editedDescription" className="block text-sm font-medium text-slate-700">Description</label>
                    <textarea id="editedDescription" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} rows={3} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                    <button onClick={() => setEditMode(false)} className="py-2 px-4 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                    <button onClick={handleUpdateItineraryDetails} disabled={isLoading} className="py-2 px-4 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-md disabled:opacity-50">{isLoading ? "Saving..." : "Save Changes"}</button>
                </div>
            </div>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        )}

        {(itinerary.startDate || itinerary.endDate) && (
          <div className="mb-4 pb-4 border-b border-slate-200">
            <p className="text-sm text-slate-500">
              <span className="font-medium">Dates:</span> 
              {itinerary.startDate ? new Date(itinerary.startDate).toLocaleDateString() : "Not set"} - 
              {itinerary.endDate ? new Date(itinerary.endDate).toLocaleDateString() : "Not set"}
            </p>
          </div>
        )}
        {itinerary.destinations && itinerary.destinations.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-slate-500">
              <span className="font-medium">Destinations:</span> {itinerary.destinations.join(", ")}
            </p>
          </div>
        )}
      </div>

      {/* Itinerary Items Section */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-ocean-blue-700">Itinerary Items</h2>
          <button 
            onClick={handleAddItem}
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            Add Item
          </button>
        </div>

        {itinerary.items && itinerary.items.length > 0 ? (
          <ul className="space-y-4">
            {itinerary.items.map((item, index) => (
              <li key={item._id || index} className="p-4 border border-slate-200 rounded-md hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-800">{item.itemName} <span className="text-xs font-normal text-slate-500">({item.itemType})</span></h3>
                    {item.itemDescription && <p className="text-sm text-slate-600 mt-1">{item.itemDescription}</p>}
                    {(item.startDate || item.endDate) && (
                        <p className="text-xs text-slate-500 mt-1">
                            {item.startDate ? new Date(item.startDate).toLocaleDateString() : ""} - {item.endDate ? new Date(item.endDate).toLocaleDateString() : ""}
                        </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex space-x-2 ml-4">
                    <button onClick={() => handleEditItem(item._id!)} className="p-1 text-slate-400 hover:text-ocean-blue-500"><PencilIcon className="h-4 w-4" /></button>
                    <button onClick={() => handleDeleteItem(item._id!)} className="p-1 text-slate-400 hover:text-red-500"><TrashIcon className="h-4 w-4" /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-center py-4">No items added to this itinerary yet.</p>
        )}
      </div>
    </div>
  );
}

