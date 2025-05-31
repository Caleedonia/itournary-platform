"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

// Define interfaces for the items to be displayed
interface FavoriteItem {
  _id: string;
  name?: string;
  slug?: { current?: string }; // Assuming resorts/services have slugs for linking
  // Add other relevant fields you might want to display, e.g., mainImage
}

interface UserFavoritesData {
  favoriteResorts: FavoriteItem[];
  favoriteServices: FavoriteItem[];
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<UserFavoritesData | null>(null);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [favoritesError, setFavoritesError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      setLoadingFavorites(true);
      fetch("/api/users/favorites")
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          } else {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to load favorites");
          }
        })
        .then((data: UserFavoritesData) => {
          setFavorites(data);
          setFavoritesError(null);
        })
        .catch((err) => {
          console.error("Error fetching favorites:", err);
          setFavoritesError(err.message || "Could not load your favorites.");
          setFavorites(null); // Clear any old data
        })
        .finally(() => {
          setLoadingFavorites(false);
        });
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Loading account information...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">My Account</h1>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Welcome, {session.user?.name || session.user?.email}!</h2>
          <div className="mb-4">
            <p className="text-gray-600"><span className="font-medium">Name:</span> {session.user?.name || "Not set"}</p>
            <p className="text-gray-600"><span className="font-medium">Email:</span> {session.user?.email}</p>
            {/* @ts-ignore */}
            <p className="text-gray-600"><span className="font-medium">Role:</span> {session.user?.role || "member"}</p>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">My Favorites</h3>
            {loadingFavorites && <p className="text-gray-500">Loading favorites...</p>}
            {favoritesError && <p className="text-red-500 bg-red-100 p-3 rounded-md">Error: {favoritesError}</p>}
            {favorites && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-ocean-blue-600 mb-2">Favorite Resorts ({favorites.favoriteResorts?.length || 0})</h4>
                  {favorites.favoriteResorts && favorites.favoriteResorts.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {favorites.favoriteResorts.map(resort => (
                        <li key={resort._id} className="text-gray-600">
                          <Link href={`/resorts/${resort.slug?.current || resort._id}`} className="hover:text-coral-600 hover:underline">
                            {resort.name || "Unnamed Resort"}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">You haven&apos;t favorited any resorts yet.</p>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-medium text-ocean-blue-600 mb-2">Favorite Services ({favorites.favoriteServices?.length || 0})</h4>
                  {favorites.favoriteServices && favorites.favoriteServices.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {favorites.favoriteServices.map(service => (
                        <li key={service._id} className="text-gray-600">
                          {/* Adjust href if service slugs are different or not present */}
                          <Link href={`/services/${service.slug?.current || service._id}`} className="hover:text-coral-600 hover:underline">
                            {service.name || "Unnamed Service"}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">You haven&apos;t favorited any services yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 border-t pt-6 flex justify-between items-center">
            <Link href="/account/edit-profile" className="text-ocean-blue-600 hover:text-ocean-blue-700 font-medium">
              Edit Profile
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-coral-500 hover:bg-coral-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
            >
              Sign Out
            </button>
          </div>

          {/* Placeholder for links to other account sections */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Other Account Options</h3>
            <ul className="space-y-2">
              <li><Link href="/account/loyalty" className="text-ocean-blue-600 hover:underline">My Rewards</Link></li>
              <li><Link href="/account/settings" className="text-ocean-blue-600 hover:underline">Account Settings</Link></li>
              <li><Link href="#" className="text-ocean-blue-600 hover:underline">My Bookings (Coming Soon)</Link></li>
              <li><Link href="#" className="text-ocean-blue-600 hover:underline">My Itineraries (Coming Soon)</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // If not signed in, redirect to login or show login form (current page already handles login form)
  // For simplicity, this page will show its own login form if not authenticated.
  // You might want a dedicated /login page and redirect there if status is "unauthenticated".
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign In Required</h1>
        <p className="text-center text-gray-600 mb-6">Please sign in to view your account details and favorites.</p>
        <Link href="/api/auth/signin"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ocean-blue-600 hover:bg-ocean-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue-500">
          Go to Sign In
        </Link>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-coral-600 hover:text-coral-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
