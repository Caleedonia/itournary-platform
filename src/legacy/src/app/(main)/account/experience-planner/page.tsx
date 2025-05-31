"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IExperience } from "@/models/Experience"; // Assuming this path is correct

export default function ExperiencePlannerDashboardPage() {
  const { data: session, status } = useSession();
  const [experiences, setExperiences] = useState<Partial<IExperience>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debug logging for session
  console.log("Current auth status:", status);
  console.log("Current session:", session);

  const fetchExperiences = useCallback(async () => {
    if (status === "authenticated") {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching experiences...");
        const response = await fetch("/api/experiences"); 
        
        if (!response.ok) {
          throw new Error(`Failed to fetch experiences: ${response.status}`);
        }
        
        let responseText;
        try {
          responseText = await response.text();
          const data = JSON.parse(responseText);
          console.log("Experiences fetched:", data.experiences);
          setExperiences(data.experiences || []);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          console.error("Response text:", responseText);
          throw new Error("Invalid response format");
        }
      } catch (e) {
        console.error("Failed to fetch experiences:", e);
        setError(e.message || "Could not load your planned experiences.");
        setExperiences([]); 
      } finally {
        setIsLoading(false);
      }
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchExperiences();
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, fetchExperiences]);

  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return <div className="container mx-auto px-4 py-12 text-center text-slate-700">Loading your Experience Planner...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-coral-600 mb-4">Access Denied</h1>
          <p className="text-slate-600 mb-6">
            Please log in to access your Experience Planner.
          </p>
          <Link 
            href="/account" 
            className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors text-lg shadow-md hover:shadow-lg inline-block"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-slate-600 mt-4 mb-6">{error}</p>
          <button 
            onClick={fetchExperiences} 
            className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-ocean-blue-700">My Experience Planner</h1>
        <Link 
          href="/account/experience-planner/new" 
          className="bg-coral-500 hover:bg-coral-600 text-white font-semibold py-2 px-4 rounded-md transition-colors shadow-md"
        >
          + Create New Experience
        </Link>
      </div>

      {/* Debug section */}
      <div className="mb-6 p-4 bg-blue-100 rounded">
        <p className="mb-2 font-medium">Debug Tools:</p>
        <div className="flex flex-wrap gap-4">
          <Link 
            href="/account/experience-planner/test-exp-1" 
            className="text-blue-600 underline"
          >
            Test Direct Link
          </Link>
          <button
            onClick={() => console.log("Current experiences:", experiences)}
            className="text-green-600 underline"
          >
            Log Experiences
          </button>
          <Link 
            href="/api-test" 
            className="text-purple-600 underline"
          >
            API Test Page
          </Link>
        </div>
      </div>

      {isLoading && experiences.length === 0 && (
        <div className="text-center py-10 text-slate-700">Loading experiences...</div>
      )}

      {!isLoading && experiences.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-lg shadow-md">
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h2 className="mt-2 text-xl font-semibold text-slate-800">No Experiences Yet</h2>
          <p className="mt-1 text-sm text-slate-500">
            Get started by planning your first occasion!
          </p>
          <div className="mt-6">
            <Link 
              href="/account/experience-planner/new" 
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              Create New Experience
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <Link href={`/account/experience-planner/${exp._id}`} key={exp._id} className="block group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-ocean-blue-700 mb-2 truncate group-hover:text-coral-600">
                    {exp.experienceName || "Untitled Experience"}
                  </h2>
                  {exp.occasionTypeName && (
                    <p className="text-sm font-medium text-teal-600 mb-1">{exp.occasionTypeName}</p>
                  )}
                  {exp.destination && (
                    <p className="text-xs text-slate-500 mb-1">Destination: {exp.destination}</p>
                  )}
                  {exp.startDate && (
                    <p className="text-xs text-slate-500 mb-3">
                      Date: {new Date(exp.startDate).toLocaleDateString()}
                    </p>
                  )}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <span className="text-sm font-medium text-coral-600 group-hover:underline">View Details &rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
