// src/app/(main)/service-providers/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { sanityClient, fetchData } from "@/lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

// Define the interface for a Service Provider based on the Sanity schema
interface SanityImageSource {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

interface ServiceProvider {
  _id: string;
  name?: string;
  slug?: { current?: string };
  isVerified?: boolean;
  serviceType?: string;
  otherServiceTypeName?: string;
  description?: string; 
  mainImage?: SanityImageSource;
  locationsServed?: string[];
  // For filtering, we might need to fetch all service types available
}

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: SanityImageSource) {
  if (!source || !source.asset) return null;
  return builder.image(source);
}

// Define available service types for the filter dropdown (could also be fetched from Sanity)
const SERVICE_TYPE_OPTIONS = [
  { title: "All Services", value: "" },
  { title: "Photographer", value: "photographer" },
  { title: "Wedding Planner", value: "wedding_planner" },
  { title: "Caterer", value: "caterer" },
  { title: "Florist", value: "florist" },
  { title: "DJ / Musician", value: "dj_musician" },
  { title: "Transportation", value: "transportation" },
  { title: "Event Rentals", value: "event_rentals" },
  { title: "Officiant", value: "officiant" },
  { title: "Hair & Makeup Artist", value: "hair_makeup_artist" },
  { title: "Tour Guide", value: "tour_guide" },
  { title: "Activity Provider", value: "activity_provider" },
  { title: "Venue Decor", value: "venue_decor" },
  { title: "Attire & Accessories", value: "attire_accessories" },
  { title: "Travel Agent (Specialized)", value: "travel_agent_specialized" },
  { title: "Wellness Instructor", value: "wellness_instructor" },
  { title: "Childcare Provider", value: "childcare_provider" },
  { title: "Private Chef", value: "private_chef" },
  { title: "Cultural Guide", value: "cultural_guide" },
  { title: "Other", value: "other" },
];

export default function ServiceProvidersDirectoryPage() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const fetchProviders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let query = `*[_type == "serviceProvider"`;
      const filters: string[] = [];
      const params: Record<string, any> = {};

      if (searchTerm) {
        filters.push(`(name match $searchTerm || description match $searchTerm || bio match $searchTerm)`);
        params.searchTerm = `*${searchTerm}*`;
      }
      if (selectedServiceType) {
        filters.push(`serviceType == $serviceType`);
        params.serviceType = selectedServiceType;
      }
      if (locationFilter) {
        // This assumes locationsServed is an array of strings and we check if any of them contain the locationFilter text
        // For more precise matching, you might need a more complex query or pre-processing of location data
        filters.push(`$locationFilter in locationsServed[]`); 
        params.locationFilter = locationFilter; // For exact match in array
        // Or for partial match: filters.push(`count((locationsServed[])[@ match $locationFilter]) > 0`);
        // params.locationFilter = `*${locationFilter}*`;
      }
      if (verifiedOnly) {
        filters.push(`isVerified == true`);
      }

      if (filters.length > 0) {
        query += ` && (${filters.join(" && ")})`
      }

      query += `]{
        _id,
        name,
        slug,
        isVerified,
        serviceType,
        otherServiceTypeName,
        description,
        mainImage{
          asset->{
            _id,
            url
          },
          alt
        },
        locationsServed
      }`;

      const fetchedProviders = await fetchData<ServiceProvider[]>(query, params);
      setProviders(fetchedProviders || []);
    } catch (e) {
      console.error("Failed to fetch service providers:", e);
      setError("Failed to load service providers.");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedServiceType, locationFilter, verifiedOnly]);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  if (isLoading && providers.length === 0) { // Show loading only on initial load or when filters result in no immediate data
    return <div className="container mx-auto px-4 py-12 text-center">Loading service providers...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-coral-600">Error</h1>
        <p className="text-slate-600 mt-4">{error}</p>
        <Link href="/" className="mt-6 inline-block bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-ocean-blue-700 mb-8 text-center">Service Provider Directory</h1>
      
      <div className="mb-8 p-6 bg-sky-50 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="searchTerm" className="block text-sm font-medium text-slate-700 mb-1">Search by Name/Keyword</label>
            <input 
              type="text" 
              id="searchTerm"
              placeholder="e.g., Photographer, Catering" 
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="serviceTypeFilter" className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
            <select 
              id="serviceTypeFilter"
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
              value={selectedServiceType}
              onChange={(e) => setSelectedServiceType(e.target.value)}
            >
              {SERVICE_TYPE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="locationFilter" className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input 
              type="text" 
              id="locationFilter"
              placeholder="e.g., Bali, Paris" 
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-start md:justify-self-start lg:justify-self-auto pt-5">
            <input 
              type="checkbox" 
              id="verifiedOnlyFilter" 
              className="h-4 w-4 text-coral-600 border-slate-300 rounded focus:ring-coral-500 mr-2"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
            />
            <label htmlFor="verifiedOnlyFilter" className="text-sm font-medium text-slate-700">Show Verified Only</label>
          </div>
        </div>
      </div>

      {isLoading && <div className="text-center py-10">Filtering results...</div>}

      {!isLoading && providers.length === 0 ? (
        <div className="text-center text-slate-600 py-10">
          <p className="text-xl">No service providers found matching your criteria.</p>
          <p>Please try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => {
            // UPDATED IMAGE URL CODE HERE:
            const imageUrl = provider.mainImage ? 
              urlFor(provider.mainImage)
                .width(400)
                .height(300)
                .fit("crop")
                .crop("entropy")  // Smart cropping - focuses on the important parts
                .auto("format")
                .url() 
              : "/placeholder-service.jpg";
              
            const imageAlt = provider.mainImage?.alt || provider.name || "Service provider image";
            const providerLink = provider.slug ? `/service-providers/${provider.slug.current}` : "#";
            let displayServiceType = provider.serviceType;
            if (provider.serviceType === "other" && provider.otherServiceTypeName) {
              displayServiceType = provider.otherServiceTypeName;
            }

            return (
              <Link href={providerLink} key={provider._id} className="block group">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                  <div className="relative h-60 w-full">
                    <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="cover" />
                    {provider.isVerified && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.469 6.469a.75.75 0 01.011 1.05l-3.25 3.5a.75.75 0 01-1.072-.01L6.47 11.03a.75.75 0 011.05-1.072l2.094 1.94L12.725 9.97a.75.75 0 011.012.054z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-2 truncate group-hover:text-coral-600">{provider.name || "Service Provider"}</h2>
                    {displayServiceType && (
                      <p className="text-sm font-medium text-teal-600 mb-2 capitalize">{displayServiceType.replace(/_/g, " ")}</p>
                    )}
                    {provider.description && (
                      <p className="text-slate-600 text-sm mb-3 line-clamp-3">{provider.description}</p>
                    )}
                    {provider.locationsServed && provider.locationsServed.length > 0 && (
                      <p className="text-xs text-slate-500">Serves: {provider.locationsServed.join(", ")}</p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
