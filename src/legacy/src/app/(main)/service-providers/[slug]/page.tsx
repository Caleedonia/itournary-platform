// src/app/(main)/service-providers/[slug]/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react"; // Added useCallback
import { sanityClient, fetchData } from "@/lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import FavoriteButton from "@/components/FavoriteButton"; 
import InquiryForm from "@/components/InquiryForm"; // Import the InquiryForm

// --- Interfaces (should match or extend those in serviceProvider.ts and directory page) ---
interface SanityImageSource {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
}

interface VideoEmbed {
  _type: "videoEmbed";
  url?: string;
  caption?: string;
}

interface PortfolioItem {
  _key: string;
  _type: "image" | "videoEmbed";
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
  url?: string; // for video
}

interface Testimonial {
  _key: string;
  quote?: string;
  clientName?: string;
  date?: string;
}

interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
}

interface SocialMediaLink {
  _key: string;
  platform?: string;
  url?: string;
}

interface PricingModel {
  type?: string;
  amountMin?: number;
  amountMax?: number;
  currency?: string;
  details?: string;
}

interface ServiceProviderDetail {
  _id: string;
  name?: string;
  slug?: { current?: string };
  isVerified?: boolean;
  serviceType?: string;
  otherServiceTypeName?: string;
  description?: any; // Portable Text for full description
  bio?: any; // Portable Text
  mainImage?: SanityImageSource;
  portfolio?: PortfolioItem[];
  testimonials?: Testimonial[];
  contactInfo?: ContactInfo;
  socialMediaLinks?: SocialMediaLink[];
  locationsServed?: string[];
  pricingModel?: PricingModel;
  availabilityNotes?: string;
  yearsOfExperience?: number;
  languagesSpoken?: string[];
  seo?: { metaTitle?: string; metaDescription?: string };
}

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: SanityImageSource | PortfolioItem) {
  if (!source || !source.asset) return null;
  return builder.image(source as SanityImageSource); 
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
            alt={value.alt || "Service provider image"} 
            width={800} 
            height={600} 
            className="rounded-md shadow-md object-cover"
          />
          {value.caption && <p className="text-sm text-slate-600 text-center mt-1">{value.caption}</p>}
        </div>
      );
    },
  },
};

export default function ServiceProviderProfilePage() {
  const params = useParams<{ slug: string }>();
  const providerSlug = params?.slug;

  const { data: session, status: sessionStatus } = useSession();
  const [provider, setProvider] = useState<ServiceProviderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(true);

  const fetchProviderData = useCallback(async () => {
    if (!providerSlug) {
      setError("Provider slug not found.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const query = `*[_type == "serviceProvider" && slug.current == $slug][0]{
        _id,
        name,
        slug,
        isVerified,
        serviceType,
        otherServiceTypeName,
        description,
        bio,
        mainImage{
          asset->{_id, url},
          alt,
          caption
        },
        portfolio[]{
          _key,
          _type,
          caption,
          alt,
          asset->{_id, url}, 
          url 
        },
        testimonials[]{
          _key,
          quote,
          clientName,
          date
        },
        contactInfo,
        socialMediaLinks[]{
          _key,
          platform,
          url
        },
        locationsServed,
        pricingModel,
        availabilityNotes,
        yearsOfExperience,
        languagesSpoken,
        seo
      }`;
      const fetchedProvider = await fetchData<ServiceProviderDetail>(query, { slug: providerSlug });
      if (fetchedProvider) {
        setProvider(fetchedProvider);
      } else {
        setError("Service provider not found.");
      }
    } catch (e) {
      console.error("Failed to fetch service provider:", e);
      setError("Failed to load service provider details.");
    } finally {
      setIsLoading(false);
    }
  }, [providerSlug]);

  useEffect(() => {
    fetchProviderData();
  }, [fetchProviderData]);

  const checkFavoriteStatus = useCallback(async () => {
    if (sessionStatus === "authenticated" && provider?._id) {
      setIsLoadingFavorite(true);
      try {
        const response = await fetch(`/api/users/favorites/service-providers`);
        if (response.ok) {
          const data = await response.json();
          if (data.favoriteServiceProviders && data.favoriteServiceProviders.includes(provider._id)) {
            setIsFavorited(true);
          }
        } else {
          console.error("Failed to fetch favorite status");
        }
      } catch (err) {
        console.error("Error fetching favorite status:", err);
      } finally {
        setIsLoadingFavorite(false);
      }
    }
  }, [sessionStatus, provider?._id]);

  useEffect(() => {
    if (provider?._id) { // Only check if provider data is loaded
        checkFavoriteStatus();
    }
  }, [provider, checkFavoriteStatus]);

  const handleFavoriteToggle = async () => {
    if (sessionStatus !== "authenticated" || !provider?._id) {
      alert("Please log in to save favorites.");
      return;
    }
    const newIsFavorited = !isFavorited;
    try {
      const response = await fetch(`/api/users/favorites/service-providers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerId: provider._id, action: newIsFavorited ? "add" : "remove" }),
      });
      if (response.ok) {
        setIsFavorited(newIsFavorited);
      } else {
        const errorData = await response.json();
        alert(`Failed to update favorites: ${errorData.message || "Please try again."}`);
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
      alert("An error occurred while updating favorites.");
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading service provider details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-coral-600">Error</h1>
        <p className="text-slate-600 mt-4">{error}</p>
        <Link href="/service-providers" className="mt-6 inline-block bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Back to Directory
        </Link>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-coral-600">Service Provider Not Found</h1>
        <p className="text-slate-600 mt-4">Sorry, we couldn&apos;t find the provider you&apos;re looking for.</p>
        <Link href="/service-providers" className="mt-6 inline-block bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Back to Directory
        </Link>
      </div>
    );
  }

  const mainImageUrl = provider.mainImage ? urlFor(provider.mainImage)?.width(1200).height(600).auto("format").url() : "/placeholder-service-banner.jpg";
  const mainImageAlt = provider.mainImage?.alt || provider.name || "Service provider main image";
  let displayServiceType = provider.serviceType;
  if (provider.serviceType === "other" && provider.otherServiceTypeName) {
    displayServiceType = provider.otherServiceTypeName;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <section className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg bg-slate-200">
        {provider.mainImage && (
          <Image src={mainImageUrl || ""} alt={mainImageAlt} layout="fill" objectFit="cover" priority />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 md:p-10">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-1 drop-shadow-md">{provider.name || "Service Provider"}</h1>
              {displayServiceType && (
                <p className="text-xl text-sand-100 drop-shadow-sm capitalize">{displayServiceType.replace(/_/g, " ")}</p>
              )}
            </div>
            {provider.isVerified && (
              <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center self-start md:self-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.469 6.469a.75.75 0 01.011 1.05l-3.25 3.5a.75.75 0 01-1.072-.01L6.47 11.03a.75.75 0 011.05-1.072l2.094 1.94L12.725 9.97a.75.75 0 011.012.054z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {provider.description && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-3">About this Provider</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <PortableText value={provider.description} components={portableTextComponents} />
              </div>
            </div>
          )}
          {provider.bio && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-3">Bio</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <PortableText value={provider.bio} components={portableTextComponents} />
              </div>
            </div>
          )}
          {provider.portfolio && provider.portfolio.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {provider.portfolio.map((item) => (
                  <div key={item._key} className="aspect-square relative rounded overflow-hidden shadow-sm">
                    {item._type === "image" && item.asset ? (
                      <Image 
                        src={urlFor(item)?.width(400).height(400).auto("format").url() || ""} 
                        alt={item.alt || "Portfolio image"} 
                        layout="fill" 
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-300"
                      />
                    ) : item._type === "videoEmbed" && item.url ? (
                      <div className="w-full h-full bg-black flex items-center justify-center">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-white underline p-4 text-center">
                          Watch Video{item.caption ? `: ${item.caption}` : ""}
                        </a>
                      </div>
                    ) : null}
                    {item.caption && item._type === "image" && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-2 truncate">
                            {item.caption}
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {provider.testimonials && provider.testimonials.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-4">Testimonials</h2>
              <div className="space-y-4">
                {provider.testimonials.map((testimonial) => (
                  <blockquote key={testimonial._key} className="p-4 bg-sand-50 rounded-md border-l-4 border-coral-500">
                    <p className="text-slate-700 italic mb-2">{testimonial.quote}</p>
                    <footer className="text-sm text-slate-500">
                      - {testimonial.clientName}
                      {testimonial.date && <span className="ml-2">({new Date(testimonial.date).toLocaleDateString()})</span>}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-ocean-blue-600 mb-4">Contact & Info</h2>
            {sessionStatus === "authenticated" && provider._id && !isLoadingFavorite && (
                <div className="mb-4">
                    <FavoriteButton 
                        itemId={provider._id} 
                        itemType="serviceProvider"
                        initialIsFavorited={isFavorited}
                        onToggleFavorite={handleFavoriteToggle} 
                    />
                </div>
            )}
            {sessionStatus === "authenticated" && isLoadingFavorite && (
                <div className="mb-4 h-10 flex items-center justify-center text-sm text-slate-500">Loading favorite status...</div>
            )}
            {provider.contactInfo?.website && (
              <p className="mb-2"><strong className="text-slate-700">Website:</strong> <a href={provider.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-coral-600 hover:underline">{provider.contactInfo.website}</a></p>
            )}
            {provider.contactInfo?.email && (
              <p className="mb-2"><strong className="text-slate-700">Email:</strong> <a href={`mailto:${provider.contactInfo.email}`} className="text-coral-600 hover:underline">{provider.contactInfo.email}</a></p>
            )}
            {provider.contactInfo?.phone && (
              <p className="mb-2"><strong className="text-slate-700">Phone:</strong> {provider.contactInfo.phone}</p>
            )}
            {provider.contactInfo?.address && (
              <p className="mb-2"><strong className="text-slate-700">Address:</strong> {provider.contactInfo.address}</p>
            )}
            {provider.locationsServed && provider.locationsServed.length > 0 && (
              <p className="mt-3 pt-3 border-t border-slate-200"><strong className="text-slate-700">Locations Served:</strong> {provider.locationsServed.join(", ")}</p>
            )}
            {provider.languagesSpoken && provider.languagesSpoken.length > 0 && (
              <p className="mt-1"><strong className="text-slate-700">Languages:</strong> {provider.languagesSpoken.join(", ")}</p>
            )}
            {provider.yearsOfExperience !== undefined && (
              <p className="mt-1"><strong className="text-slate-700">Experience:</strong> {provider.yearsOfExperience} years</p>
            )}
            {provider.socialMediaLinks && provider.socialMediaLinks.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                    <strong className="text-slate-700 block mb-1">Social Media:</strong>
                    <div className="flex flex-wrap gap-2">
                        {provider.socialMediaLinks.map(link => link.url && (
                            <a key={link._key} href={link.url} target="_blank" rel="noopener noreferrer" className="text-coral-500 hover:text-coral-700 underline text-sm">{link.platform || "Link"}</a>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {provider.pricingModel && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-ocean-blue-600 mb-3">Pricing</h2>
              {provider.pricingModel.type && <p className="font-medium text-slate-700 capitalize mb-1">{provider.pricingModel.type.replace(/_/g, " ")}</p>}
              {(provider.pricingModel.type === "starting_from" || provider.pricingModel.type === "hourly") && provider.pricingModel.amountMin && (
                <p className="text-2xl font-bold text-teal-600">{provider.pricingModel.currency || "$"}{provider.pricingMadel.amountMin}{provider.pricingModel.type === "hourly" ? "/hr" : "+"}</p>
              )}
              {provider.pricingModel.type === "range" && provider.pricingModel.amountMin && provider.pricingModel.amountMax && (
                <p className="text-2xl font-bold text-teal-600">{provider.pricingModel.currency || "$"}{provider.pricingModel.amountMin} - {provider.pricingModel.currency || "$"}{provider.pricingModel.amountMax}</p>
              )}
              {provider.pricingModel.details && (
                <p className="text-sm text-slate-600 mt-2">{provider.pricingModel.details}</p>
              )}
            </div>
          )}

          {provider.availabilityNotes && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-ocean-blue-600 mb-3">Availability</h2>
              <p className="text-sm text-slate-600">{provider.availabilityNotes}</p>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-ocean-blue-600 mb-3">Request a Quote / Inquire</h2>
            <InquiryForm providerId={provider._id} providerName={provider.name} />
          </div>
        </div>
      </section>
    </div>
  );
}

