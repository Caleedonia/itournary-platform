// src/app/(main)/occasions/[slug]/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { sanityClient, fetchData } from "@/lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { useParams } from "next/navigation";

// --- Interfaces ---
interface SanityImageSource {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
}

interface OccasionTypeDetail {
  _id: string;
  name?: string;
  slug?: { current?: string };
  description?: any; // Portable Text
  mainImage?: SanityImageSource;
  planningConsiderations?: any; // Portable Text
  typicalServices?: string[];
  icon?: SanityImageSource; // Optional icon
  seo?: { metaTitle?: string; metaDescription?: string };
}

// Minimal interface for featured providers, can be expanded
interface FeaturedProvider {
  _id: string;
  name?: string;
  slug?: { current?: string };
  mainImage?: SanityImageSource;
  serviceType?: string;
}

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: SanityImageSource) {
  if (!source || !source.asset) return null;
  return builder.image(source);
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-4">
          <Image 
            src={urlFor(value)?.width(800).auto("format").url() || ""} 
            alt={value.alt || "Occasion image"} 
            width={800} 
            height={600} 
            className="rounded-md shadow-md object-cover"
          />
          {value.caption && <p className="text-sm text-slate-600 text-center mt-1">{value.caption}</p>}
        </div>
      );
    },
  },
  // Add more custom components for portable text if needed (e.g., for lists, custom blocks)
};

export default function OccasionLandingPage() {
  const params = useParams<{ slug: string }>();
  const occasionSlug = params?.slug;

  const [occasion, setOccasion] = useState<OccasionTypeDetail | null>(null);
  const [featuredProviders, setFeaturedProviders] = useState<FeaturedProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOccasionData = useCallback(async () => {
    if (!occasionSlug) {
      setError("Occasion slug not found.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const query = `*[_type == "occasionType" && slug.current == $slug][0]{
        _id,
        name,
        slug,
        description,
        mainImage{
          asset->{_id, url},
          alt,
          caption
        },
        planningConsiderations,
        typicalServices,
        icon{
          asset->{_id, url},
          alt
        },
        seo
      }`;
      const fetchedOccasion = await fetchData<OccasionTypeDetail>(query, { slug: occasionSlug });
      
      if (fetchedOccasion) {
        setOccasion(fetchedOccasion);
        // Fetch a few featured providers for this occasion type (example)
        const providerQuery = `*[_type == "serviceProvider" && $occasionId in applicableOccasions[]._ref && isFeatured == true][0...3]{
          _id,
          name,
          slug,
          mainImage{
            asset->{_id, url},
            alt
          },
          serviceType
        }`;
        const fetchedFeaturedProviders = await fetchData<FeaturedProvider[]>(providerQuery, { occasionId: fetchedOccasion._id });
        setFeaturedProviders(fetchedFeaturedProviders || []);
      } else {
        setError("Occasion type not found.");
      }
    } catch (e) {
      console.error("Failed to fetch occasion data:", e);
      setError("Failed to load occasion details.");
    } finally {
      setIsLoading(false);
    }
  }, [occasionSlug]);

  useEffect(() => {
    fetchOccasionData();
  }, [fetchOccasionData]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading occasion details...</div>;
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

  if (!occasion) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-coral-600">Occasion Not Found</h1>
        <p className="text-slate-600 mt-4">Sorry, we couldn&apos;t find the occasion you&apos;re looking for.</p>
        <Link href="/" className="mt-6 inline-block bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  const heroImageUrl = occasion.mainImage ? urlFor(occasion.mainImage)?.width(1600).height(700).auto("format").url() : "/placeholder-occasion-banner.jpg";
  const heroImageAlt = occasion.mainImage?.alt || occasion.name || "Occasion hero image";

  return (
    <div className="space-y-12 md:space-y-16 pb-12">
      {/* --- Hero Section --- */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[700px] bg-slate-300">
        {occasion.mainImage && (
          <Image src={heroImageUrl || ""} alt={heroImageAlt} layout="fill" objectFit="cover" priority />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Plan Your Dream {occasion.name}
          </h1>
          <p className="text-lg md:text-xl text-sand-100 mb-8 max-w-2xl drop-shadow-md">
            Discover everything you need to create an unforgettable {occasion.name.toLowerCase()} experience with iTournary.
          </p>
          <Link 
            href={`/service-providers?occasionType=${occasion._id}`}
            className="bg-coral-500 hover:bg-coral-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Find Providers for Your {occasion.name}
          </Link>
        </div>
      </section>

      {/* --- Introduction Section --- */}
      {occasion.description && (
        <section className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-ocean-blue-700 mb-4 text-center">Understanding Your {occasion.name}</h2>
            <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed">
              <PortableText value={occasion.description} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* --- Provider Showcase Section --- */}
      <section className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-semibold text-ocean-blue-700 mb-6 text-center">Featured Providers for {occasion.name}</h2>
        {featuredProviders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProviders.map(provider => {
              const providerImageUrl = provider.mainImage ? urlFor(provider.mainImage)?.width(400).height(300).auto("format").url() : "/placeholder-service.jpg";
              const providerImageAlt = provider.mainImage?.alt || provider.name || "Service provider image";
              return (
                <Link href={`/service-providers/${provider.slug?.current || provider._id}`} key={provider._id} className="block group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-52 w-full">
                      <Image src={providerImageUrl || ""} alt={providerImageAlt} layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-ocean-blue-600 mb-1 truncate group-hover:text-coral-500">{provider.name}</h3>
                      {provider.serviceType && <p className="text-sm text-teal-600 capitalize">{provider.serviceType.replace(/_/g, " ")}</p>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-slate-600">No featured providers available for this occasion yet. Check back soon!</p>
        )}
        <div className="text-center mt-8">
          <Link 
            href={`/service-providers?occasionType=${occasion._id}`}
            className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors text-lg"
          >
            View All {occasion.name} Providers
          </Link>
        </div>
      </section>

      {/* --- Planning Considerations Section (Optional based on content) --- */}
      {occasion.planningConsiderations && (
        <section className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto bg-sky-50 p-6 md:p-8 rounded-lg shadow">
            <h2 className="text-3xl font-semibold text-ocean-blue-700 mb-4 text-center">Planning Your {occasion.name}: Key Considerations</h2>
            <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed">
              <PortableText value={occasion.planningConsiderations} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* --- Final CTA to Experience Planner (Placeholder for now) --- */}
      <section className="container mx-auto px-4 md:px-6 text-center">
         <h2 className="text-3xl font-semibold text-ocean-blue-700 mb-4">Ready to Start Planning in Detail?</h2>
         <p className="text-lg text-slate-600 mb-6 max-w-xl mx-auto">
            Our Experience Planner will help you organize every aspect of your {occasion.name.toLowerCase()}.
         </p>
         {/* This will eventually link to the Experience Planner, pre-selecting the occasion */}
         <button 
            disabled 
            className="bg-coral-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg opacity-50 cursor-not-allowed"
            title="Experience Planner Coming Soon!"
          >
            Open Experience Planner (Coming Soon)
          </button>
      </section>

    </div>
  );
}

