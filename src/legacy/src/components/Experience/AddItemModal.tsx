// src/components/Experience/AddItemModal.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { fetchData } from "@/lib/sanityClient"; // Assuming you have this utility
import { IExperienceItem } from "@/models/Experience";

interface AddItemModalProps {
  experienceId: string;
  itemTypeToAdd: "resort" | "serviceProvider";
  occasionTypeId?: string; // For filtering service providers
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: (newItem: IExperienceItem) => void;
}

interface SearchResult {
  _id: string;
  name: string;
  // Add other relevant fields for display, e.g., location for resorts, serviceType for providers
  location?: string; 
  serviceType?: string;
  mainImage?: any; // For resorts
  profileImage?: any; // For service providers
}

export default function AddItemModal({
  experienceId,
  itemTypeToAdd,
  occasionTypeId,
  isOpen,
  onClose,
  onItemAdded,
}: AddItemModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [customItemDetails, setCustomItemDetails] = useState({ cost: "", notes: "" });

  useEffect(() => {
    // Reset state when modal opens/closes or itemType changes
    setSearchTerm("");
    setSearchResults([]);
    setSelectedItem(null);
    setError(null);
    setCustomItemDetails({ cost: "", notes: "" });
  }, [isOpen, itemTypeToAdd]);

  const handleSearch = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim() && itemTypeToAdd !== "serviceProvider") { // Allow empty search for SPs to show all for occasion
        setSearchResults([]);
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setSelectedItem(null);

    try {
      let query = "";
      let params: any = { searchTerm: `*${searchTerm}*` };

      if (itemTypeToAdd === "resort") {
        query = `*[_type == "resort" && (name match $searchTerm || location match $searchTerm)][0...10]{_id, name, "location": location->name, "mainImage": mainImage.asset->url}`;
      } else if (itemTypeToAdd === "serviceProvider") {
        let filters = [];
        if (searchTerm.trim()) {
            filters.push(`(name match $searchTerm || serviceType match $searchTerm)`);
        }
        if (occasionTypeId) {
            filters.push(`$occasionTypeId in applicableOccasions[]._ref`);
            params.occasionTypeId = occasionTypeId;
        }
        const filterString = filters.length > 0 ? `&& ${filters.join(" && ")}` : "";
        query = `*[_type == "serviceProvider" ${filterString}][0...10]{_id, name, serviceType, "profileImage": profileImage.asset->url}`;
      }
      
      if (!query) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      const results = await fetchData<SearchResult[]>(query, params);
      setSearchResults(results || []);
    } catch (err) {
      console.error(`Failed to search ${itemTypeToAdd}s:`, err);
      setError(`Failed to search. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!selectedItem) {
      setError("Please select an item to add.");
      return;
    }
    setIsLoading(true);
    setError(null);

    const newItemPayload: Partial<IExperienceItem> = {
      itemType: itemTypeToAdd,
      itemId: selectedItem._id,
      name: selectedItem.name,
      cost: customItemDetails.cost ? parseFloat(customItemDetails.cost) : undefined,
      notes: customItemDetails.notes || undefined,
      // You might want to add more default fields here based on itemType
      status: "planned", 
    };

    try {
      const response = await fetch(`/api/experiences/${experienceId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItemPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item");
      }
      const result = await response.json();
      // Find the newly added item from the response (it might be the last one or have a temp ID)
      // For simplicity, we assume the backend returns the full experience or the added item with its new DB _id
      // Let's assume result.experience.items contains the updated list and the new item is the last one
      const addedItem = result.experience.items[result.experience.items.length -1];
      onItemAdded(addedItem as IExperienceItem); 
      onClose(); // Close modal on success
    } catch (err: any) {
      console.error("Failed to add item:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-ocean-blue-700">
            Add {itemTypeToAdd === "resort" ? "Venue/Resort" : "Service Provider"}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for ${itemTypeToAdd}s...`}
            className="flex-grow p-2 border border-slate-300 rounded-md focus:ring-coral-500 focus:border-coral-500"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
        
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

        <div className="overflow-y-auto flex-grow mb-4 pr-2 ">
          {searchResults.length > 0 ? (
            <ul className="space-y-2">
              {searchResults.map(item => (
                <li 
                  key={item._id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3 border rounded-md cursor-pointer hover:bg-coral-50 transition-colors
                    ${selectedItem?._id === item._id ? "bg-coral-100 border-coral-500 ring-2 ring-coral-500" : "border-slate-300"}
                  `}
                >
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  {itemTypeToAdd === "resort" && item.location && (
                    <p className="text-xs text-slate-500">Location: {item.location}</p>
                  )}
                  {itemTypeToAdd === "serviceProvider" && item.serviceType && (
                    <p className="text-xs text-slate-500">Service: {item.serviceType}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && searchTerm && <p className="text-slate-500 text-sm">No results found.</p>
          )}
          {isLoading && !searchResults.length && <p className="text-slate-500 text-sm">Loading results...</p>}
        </div>

        {selectedItem && (
          <div className="mb-4 p-4 border border-coral-200 rounded-md bg-coral-50 space-y-3">
            <h3 className="text-lg font-semibold text-coral-700">Add Details for: {selectedItem.name}</h3>
            <div>
              <label htmlFor="itemCost" className="block text-sm font-medium text-slate-700">Estimated Cost (Optional)</label>
              <input 
                type="number"
                id="itemCost"
                value={customItemDetails.cost}
                onChange={(e) => setCustomItemDetails(prev => ({...prev, cost: e.target.value}))}
                placeholder="e.g., 1500"
                className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-coral-500 focus:border-coral-500"
              />
            </div>
            <div>
              <label htmlFor="itemNotes" className="block text-sm font-medium text-slate-700">Notes (Optional)</label>
              <textarea 
                id="itemNotes"
                value={customItemDetails.notes}
                onChange={(e) => setCustomItemDetails(prev => ({...prev, notes: e.target.value}))}
                rows={2}
                placeholder="Any specific details or reminders..."
                className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-coral-500 focus:border-coral-500"
              />
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-slate-200 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md border border-slate-300"
          >
            Cancel
          </button>
          <button 
            onClick={handleAddItem}
            disabled={!selectedItem || isLoading}
            className="bg-coral-500 hover:bg-coral-600 text-white font-semibold px-4 py-2 rounded-md disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Add to Experience"}
          </button>
        </div>
      </div>
    </div>
  );
}

