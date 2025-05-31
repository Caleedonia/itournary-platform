// src/app/(main)/resorts/[resortId]/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { sanityClient, fetchData } from "@/lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import AffiliateLinkButton from "@/components/AffiliateLinkButton";
import FavoriteButton from "@/components/FavoriteButton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'; // Import useParams

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  if (!source || !source.asset) return null;
  return builder.image(source);
}

// --- TypeScript Interfaces (remain unchanged) ---
interface ImageAsset {
  _ref?: string;
  _type?: string;
  asset?: { _ref?: string; _type?: string; url?: string };
  url?: string;
  alt?: string;
  caption?: string;
}

interface GalleryImage extends ImageAsset {
  category?: string;
}

interface RoomType {
  _key: string;
  name?: string;
  description?: string;
  maxOccupancy?: number;
  images?: ImageAsset[];
  amenities?: string[];
}

interface DiningOption {
  _key: string;
  name?: string;
  cuisine?: string[];
  description?: any; // Portable Text
  images?: ImageAsset[];
  dressCode?: string;
  reservations?: boolean;
}

interface VenueOption {
  _key: string;
  name?: string;
  description?: any; // Portable Text
  ceremonyCapacity?: number;
  receptionCapacity?: number;
  venueType?: string;
  images?: ImageAsset[];
  virtualTours?: Array<{ url?: string; description?: string }>;
}

interface WeddingPackage {
  _key: string;
  name?: string;
  description?: any; // Portable Text
  price?: string;
  currency?: string;
  inclusions?: string[];
  validity?: string;
}

interface WeddingVenueDetails {
  _id: string; 
  resortName?: string;
  overallWeddingCapacity?: number;
  venueOptions?: VenueOption[];
  weddingPackages?: WeddingPackage[];
  planningServicesDescription?: any; 
  additionalServicesOffered?: Array<{ serviceName?: string; description?: string; pricingInfo?: string }>;
  guestAccommodationNotes?: string;
  legalRequirementsSummary?: string;
  contactForWeddings?: { name?: string; email?: string; phone?: string; bookingLink?: string };
  seo?: { metaTitle?: string; metaDescription?: string };
}

interface MeetingRoomSpace {
  _key: string;
  name?: string;
  description?: any; 
  capacityDetails?: {
    theatre?: number; classroom?: number; banquet?: number; reception?: number; uShape?: number; boardroom?: number;
    areaSqM?: number; areaSqFt?: number;
  };
  availableEquipment?: string[];
  images?: ImageAsset[];
  floorPlanUrl?: string;
}

interface CorporatePackage {
  _key: string;
  name?: string;
  description?: any; 
  priceInfo?: string;
  inclusions?: string[];
}

interface CorporateFacilityDetails {
  _id: string; 
  resortName?: string;
  meetingRoomSpaces?: MeetingRoomSpace[];
  corporatePackages?: CorporatePackage[];
  businessServices?: string[];
  teamBuildingActivities?: string[];
  contactForCorporate?: { name?: string; email?: string; phone?: string; rfpLink?: string };
  seo?: { metaTitle?: string; metaDescription?: string };
}

interface WellnessRetreatDetails {
  _id: string; 
  retreatName?: string;
  primaryFocusAreas?: string[];
  description?: any; 
  mainImage?: ImageAsset;
  gallery?: ImageAsset[];
  durationOptions?: string[];
  programHighlights?: string[];
  includedTherapiesServices?: string[];
  optionalAddOns?: Array<{ name?: string; description?: string; priceInfo?: string }>;
  instructorProfiles?: Array<{
    name?: string; specialty?: string; bio?: string; image?: ImageAsset; websiteOrSocialLink?: string;
  }>;
  typicalDailySchedule?: any; 
  accommodationDetails?: string;
  diningAndCuisine?: string;
  pricingInfo?: Array<{
    packageName?: string; price?: string; currency?: string; details?: string;
  }>;
  bookingAndCancellationPolicy?: string;
  contactForWellness?: { name?: string; email?: string; phone?: string; inquiryLink?: string };
  seo?: { metaTitle?: string; metaDescription?: string };
}

interface SportsTourismFeatures {
  hasSportsFacilities?: boolean;
  sportsFacilitiesDescription?: any; 
  suitableForTeams?: boolean;
  teamAccommodationNotes?: string;
  nearbyTournamentsVenues?: string;
  sportsPackages?: Array<{ name?: string; description?: any; inclusions?: string[]; priceInfo?: string }>;
  contactForSports?: { name?: string; email?: string; phone?: string; inquiryLink?: string };
}

interface Resort {
  _id: string;
  name?: string;
  slug?: { current?: string };
  description?: any; 
  location?: { city?: string; country?: string };
  details?: {
    starRating?: number;
    priceRange?: string; 
    propertyType?: string;
    roomCount?: number;
    amenities?: string[];
  };
  media?: { mainImage?: ImageAsset; gallery?: GalleryImage[] };
  rooms?: RoomType[];
  dining?: DiningOption[];
  nicheDetails?: {
    weddingDetails?: WeddingVenueDetails;
    corporateFacilities?: CorporateFacilityDetails;
    wellnessPrograms?: WellnessRetreatDetails;
    sportsTourismFeatures?: SportsTourismFeatures;
  };
  affiliateLinks?: Array<{ providerName?: string; url?: string; label?: string; isPrimary?: boolean; _key: string }>;
  contactInfo?: { website?: string; phone?: string; email?: string };
  seo?: { metaTitle?: string; metaDescription?: string; metaKeywords?: string[] };
}

interface UserFavorites {
  favoriteResorts: string[];
  favoriteServices: string[];
}

export default function ResortDetailPage() {
  const params = useParams<{ resortId: string }>(); // Use the useParams hook
  const resortId = params?.resortId; // Extract resortId

  const { data: session, status: sessionStatus } = useSession();
  const [resort, setResort] = useState<Resort | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userFavorites, setUserFavorites] = useState<UserFavorites | null>(null);

  useEffect(() => {
    async function fetchResortData() {
      if (!resortId) { // Check if resortId is available
        setIsLoading(false);
        setError("Resort ID not found in URL.");
        return;
      }
      setIsLoading(true);
      try {
        const query = `*[_type == "resort" && (slug.current == $slugOrId || _id == $slugOrId)][0]{
          _id, name, slug, description, location, details, media, rooms[]{
            _key, name, description, maxOccupancy, images[]{
              asset->{_id, url}, alt, caption
            }, amenities
          }, 
          dining[]{
            _key, name, cuisine, description, images[]{
              asset->{_id, url}, alt, caption
            }, dressCode, reservations
          }, 
          nicheDetails{
            weddingDetails->{...}, 
            corporateFacilities->{...}, 
            wellnessPrograms->{...},
            sportsTourismFeatures{...}
          },
          affiliateLinks, contactInfo, seo
        }`;
        const fetchedResort = await fetchData(query, { slugOrId: resortId });
        if (fetchedResort) {
          setResort(fetchedResort);
        } else {
          setError("Resort not found.");
        }
      } catch (e) {
        console.error("Failed to fetch resort:", e);
        setError("Failed to load resort details.");
      }
    }
    fetchResortData();
  }, [resortId]); // Depend on resortId from the hook

  useEffect(() => {
    async function fetchUserFavorites() {
      if (sessionStatus === "authenticated" && session?.user?.id && resort) {
        try {
          const favResponse = await fetch("/api/users/favorites");
          if (favResponse.ok) {
            const favoritesData: UserFavorites = await favResponse.json();
            setUserFavorites(favoritesData);
            if (favoritesData.favoriteResorts.includes(resort._id)) {
              setIsFavorited(true);
            }
          } else {
            console.error("Failed to fetch user favorites");
          }
        } catch (e) {
          console.error("Error fetching user favorites:", e);
        }
      }
      if (resort || error) {
          setIsLoading(false);
      }
    }

    if (resort) {
        fetchUserFavorites();
    }
  }, [sessionStatus, session, resort, error]);

  const handleFavoriteToggled = (itemId: string, newIsFavorited: boolean) => {
    setIsFavorited(newIsFavorited);
    if (userFavorites) {
        const updatedFavoriteResorts = newIsFavorited 
            ? [...userFavorites.favoriteResorts, itemId]
            : userFavorites.favoriteResorts.filter(id => id !== itemId);
        setUserFavorites({...userFavorites, favoriteResorts: updatedFavoriteResorts });
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading resort details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-coral-600">Error</h1>
        <p className="text-slate-600 mt-4">{error}</p>
        <Link href="/resorts" className="mt-6 inline-block bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Back to Resorts
        </Link>
      </div>
    );
  }

  if (!resort) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-coral-600">Resort Not Found</h1>
            <p className="text-slate-600 mt-4">Sorry, we couldn&apos;t find the resort you&apos;re looking for.</p>
            <Link href="/resorts" className="mt-6 inline-block bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
            Back to Resorts
            </Link>
        </div>
    );
  }

  const mainImageUrl = resort.media?.mainImage ? urlFor(resort.media.mainImage)?.width(1200).height(600).auto("format").url() : "/placeholder-resort-1.jpg";
  const mainImageAlt = resort.media?.mainImage?.alt || resort.name || "Resort image";

  const portableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <img 
            src={urlFor(value)?.width(800).auto("format").url()} 
            alt={value.alt || ""} 
            loading="lazy" 
            className="my-4 rounded-md shadow-md"
          />
        );
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <section className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
        {mainImageUrl && (
            <Image src={mainImageUrl} alt={mainImageAlt} layout="fill" objectFit="cover" priority />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 md:p-10">
          <div className="flex justify-between items-start">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">{resort.name || "Resort Name"}</h1>
                {resort.location && (
                    <p className="text-xl text-sand-100 drop-shadow-sm">{resort.location.city}, {resort.location.country}</p>
                )}
            </div>
            {sessionStatus === "authenticated" && resort._id && (
                <FavoriteButton 
                    itemId={resort._id} 
                    itemType="resort" 
                    initialIsFavorited={isFavorited}
                    onToggleFavorite={handleFavoriteToggled} 
                />
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {resort.description && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-3">About {resort.name}</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <PortableText value={resort.description} components={portableTextComponents} />
              </div>
            </div>
          )}
          
           {resort.details && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-ocean-blue-600 mb-3">Key Details</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                {resort.details.starRating && <li>Star Rating: {resort.details.starRating} ★</li>}
                {resort.details.priceRange && <li>Price Category: {resort.details.priceRange}</li>}
                {resort.details.propertyType && <li>Property Type: {resort.details.propertyType}</li>}
                {resort.details.roomCount && <li>Total Rooms: {resort.details.roomCount}</li>}
              </ul>
            </div>
          )}

          {resort.details?.amenities && resort.details.amenities.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-ocean-blue-600 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {resort.details.amenities.map(amenity => (
                  <span key={amenity} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">{amenity}</span>
                ))}
              </div>
            </div>
          )}

          {(resort.nicheDetails?.weddingDetails || resort.nicheDetails?.corporateFacilities || resort.nicheDetails?.wellnessPrograms || resort.nicheDetails?.sportsTourismFeatures) && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-4">Specialized Offerings</h2>
              
              {resort.nicheDetails?.weddingDetails && (
                <div className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                  <h3 className="text-xl font-semibold text-coral-600 mb-3">Weddings at {resort.name}</h3>
                  {resort.nicheDetails.weddingDetails.planningServicesDescription && <div className="prose prose-sm mb-2"><PortableText value={resort.nicheDetails.weddingDetails.planningServicesDescription} components={portableTextComponents}/></div>}
                  {resort.nicheDetails.weddingDetails.venueOptions && resort.nicheDetails.weddingDetails.venueOptions.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium text-slate-700">Venue Options:</h4>
                      <ul className="list-disc pl-5 text-sm text-slate-600">
                        {resort.nicheDetails.weddingDetails.venueOptions.map(venue => <li key={venue._key}>{venue.name} (Capacity: {venue.ceremonyCapacity} ceremony / {venue.receptionCapacity} reception) - {venue.venueType}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {resort.nicheDetails?.corporateFacilities && (
                 <div className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                  <h3 className="text-xl font-semibold text-sky-600 mb-3">Corporate Events & Meetings</h3>
                  {resort.nicheDetails.corporateFacilities.meetingRoomSpaces && resort.nicheDetails.corporateFacilities.meetingRoomSpaces.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium text-slate-700">Meeting Spaces:</h4>
                      <ul className="list-disc pl-5 text-sm text-slate-600">
                        {resort.nicheDetails.corporateFacilities.meetingRoomSpaces.map(space => <li key={space._key}>{space.name}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {resort.nicheDetails?.wellnessPrograms && (
                <div className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                  <h3 className="text-xl font-semibold text-emerald-600 mb-3">Wellness Retreats & Programs</h3>
                  {resort.nicheDetails.wellnessPrograms.description && <div className="prose prose-sm mb-2"><PortableText value={resort.nicheDetails.wellnessPrograms.description} components={portableTextComponents}/></div>}
                  {resort.nicheDetails.wellnessPrograms.primaryFocusAreas && <p className="text-sm text-slate-600">Focus: {resort.nicheDetails.wellnessPrograms.primaryFocusAreas.join(", " )}</p>}
                </div>
              )}

              {resort.nicheDetails?.sportsTourismFeatures && (
                <div className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                  <h3 className="text-xl font-semibold text-amber-600 mb-3">Sports & Team Travel</h3>
                  {resort.nicheDetails.sportsTourismFeatures.sportsFacilitiesDescription && <div className="prose prose-sm mb-2"><PortableText value={resort.nicheDetails.sportsTourismFeatures.sportsFacilitiesDescription} components={portableTextComponents}/></div>}
                  {resort.nicheDetails.sportsTourismFeatures.suitableForTeams && <p className="text-sm text-slate-600">Suitable for Teams: Yes</p>}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-1 bg-sand-100 p-6 rounded-lg shadow space-y-4 self-start sticky top-8">
          <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-3">Book Your Stay</h2>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-slate-700 font-medium mb-2">Check Availability & Prices (Direct)</p>
            <input type="date" className="w-full p-2 border rounded mt-1 focus:ring-coral-500 outline-none" aria-label="Check-in Date"/>
            <input type="date" className="w-full p-2 border rounded mt-2 focus:ring-coral-500 outline-none" aria-label="Check-out Date"/>
            <a 
              href={resort.contactInfo?.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3 px-4 rounded-md mt-3 transition-colors"
            >
              Check Prices on Resort Site
            </a>
          </div>
          {resort.affiliateLinks && resort.affiliateLinks.length > 0 && (
            <>
                <p className="text-sm text-slate-500 text-center pt-2">Or book through our partners:</p>
                {resort.affiliateLinks.map(link => (
                  link.providerName && link.url && resort.name && resort._id ? (
                    <AffiliateLinkButton 
                      key={link._key} 
                      providerName={link.providerName} 
                      url={link.url} 
                      resortId={resort._id}
                      resortName={resort.name}
                      linkLabel={link.label}
                    />
                  ) : null
                ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

