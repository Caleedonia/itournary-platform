"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react"; // Using lucide-react for icons

interface FavoriteButtonProps {
  itemId: string;
  itemType: "resort" | "service";
  initialIsFavorited: boolean;
  onToggleFavorite?: (itemId: string, newIsFavorited: boolean) => void; // Optional callback
}

export default function FavoriteButton({ 
  itemId, 
  itemType, 
  initialIsFavorited,
  onToggleFavorite 
}: FavoriteButtonProps) {
  const { data: session, status } = useSession();
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorited(initialIsFavorited);
  }, [initialIsFavorited]);

  const handleToggleFavorite = async () => {
    if (status !== "authenticated" || !session?.user?.id) {
      // Optionally, redirect to login or show a message
      alert("Please log in to save favorites.");
      return;
    }

    setIsLoading(true);
    const action = isFavorited ? "remove" : "add";

    try {
      const response = await fetch("/api/users/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, itemType, action }),
      });

      if (response.ok) {
        const newIsFavorited = !isFavorited;
        setIsFavorited(newIsFavorited);
        if (onToggleFavorite) {
          onToggleFavorite(itemId, newIsFavorited);
        }
      } else {
        // Handle error (e.g., show a notification to the user)
        console.error("Failed to update favorite status");
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Could not update favorite."}`);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return null; // Or a loading spinner for the button itself
  }

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading || status !== "authenticated"}
      className={`p-2 rounded-full transition-colors duration-200 ease-in-out 
                  ${isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-red-100"}
                  ${status !== "authenticated" ? "opacity-50 cursor-not-allowed" : ""}
                  focus:outline-none focus:ring-2 focus:ring-red-300`}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      title={status !== "authenticated" ? "Login to add favorites" : (isFavorited ? "Remove from favorites" : "Add to favorites")}
    >
      <Heart 
        size={24} 
        className={`transition-all duration-200 ease-in-out 
                   ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-400"}`}
      />
    </button>
  );
}

