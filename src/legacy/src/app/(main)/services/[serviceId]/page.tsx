// src/app/(main)/services/[serviceId]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { fetchData } from "@/lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/lib/sanityClient";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  if (!source || !source.asset) return null;
  return builder.image(source);
}

// Define interfaces based on your Sanity "service" schema
interface ImageAsset {
  _ref?: string;
  _type?: string;
  asset?: { _ref?: string; _type?: string };
  url?: string;
  alt?: string;
}

interface Service {
  _id: string;
  name?: string;
  slug?: { current?: string };
  description?: any; // Portable Text
  briefDescription?: string;
  mainImage?: ImageAsset;
  gallery?: ImageAsset[];
  category?: { name?: string; slug?: { current?: string } }; // Assuming category is a reference
  price?: number;
  currency?: string;
  duration?: string; // e.g., "2 hours", "Full Day"
  inclusions?: string[];
  exclusions?: string[];
  availability?: string; // e.g., "Daily, 9 AM - 5 PM"
  location?: {
    address?: string;
    city?: string;
    region?: string;
    country?: string;
    coordinates?: { lat?: number; lng?: number };
  };
  provider?: { name?: string; contactEmail?: string; website?: string }; // Assuming provider might be a reference or nested object
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

async function getService(slug: string): Promise<Service | null> {
  const query = `*[_type == "service" && slug.current == $slug][0]{
    _id, name, slug, description, briefDescription, mainImage, gallery, 
    category->{name, slug}, 
    price, currency, duration, inclusions, exclusions, availability, location, provider, seo
  }`;
  const service = await fetchData(query, { slug });
  return service || null;
}

export async function generateStaticParams() {
  const query = `*[_type == "service" && defined(slug.current)]{ "serviceId": slug.current }`;
  const slugs: Array<{ serviceId: string }> = await fetchData(query);
  return slugs || [];
}

export default async function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
  const service = await getService(params.serviceId);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-coral-600">Service Not Found</h1>
        <p className="text-slate-600 mt-4">Sorry, we couldn&apos;t find the service you&apos;re looking for.</p>
        <Link href="/services" className="mt-6 inline-block bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Back to Services
        </Link>
      </div>
    );
  }

  const mainImageUrl = service.mainImage ? urlFor(service.mainImage)?.width(1200).height(600).auto("format").url() : "/placeholder-service-detail.jpg";
  const mainImageAlt = service.mainImage?.alt || service.name || "Service image";

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="relative h-80 md:h-[450px] rounded-lg overflow-hidden shadow-lg">
        {mainImageUrl && (
            <Image src={mainImageUrl} alt={mainImageAlt} layout="fill" objectFit="cover" priority />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 md:p-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">{service.name || "Service Name"}</h1>
          {service.category?.name && (
            <p className="text-xl text-sand-100 drop-shadow-sm">Category: {service.category.name}</p>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Description, Details */}
        <div className="lg:col-span-2 space-y-6">
          {service.description && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-3">About This Service</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <PortableText value={service.description} />
              </div>
            </div>
          )}
          
          {(service.inclusions || service.exclusions) && (
            <div className="bg-white p-6 rounded-lg shadow">
              {service.inclusions && service.inclusions.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-ocean-blue-600 mb-2">What&apos;s Included:</h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    {service.inclusions.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
              )}
              {service.exclusions && service.exclusions.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-ocean-blue-600 mb-2">Not Included:</h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    {service.exclusions.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Booking Info, Price */}
        <div className="lg:col-span-1 bg-sand-100 p-6 rounded-lg shadow space-y-4 self-start sticky top-8">
          <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-3">Service Details</h2>
          {service.price && (
            <p className="text-3xl font-bold text-coral-600">{service.currency || "$"}{service.price}</p>
          )}
          {service.duration && (
            <p className="text-slate-700"><span className="font-medium">Duration:</span> {service.duration}</p>
          )}
          {service.availability && (
            <p className="text-slate-700"><span className="font-medium">Availability:</span> {service.availability}</p>
          )}
          {service.location?.city && (
            <p className="text-slate-700"><span className="font-medium">Location:</span> {service.location.city}{service.location.country && `, ${service.location.country}`}</p>
          )}
          {service.provider?.name && (
            <p className="text-slate-700"><span className="font-medium">Provider:</span> {service.provider.name}</p>
          )}
          <button className="w-full bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3 px-4 rounded-md mt-3 transition-colors">
            Book Now (Placeholder)
          </button>
        </div>
      </section>

      {/* Gallery Section */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-ocean-blue-700 mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {service.gallery.map((image, index) => {
              const imgUrl = urlFor(image)?.width(400).height(300).auto("format").url();
              if (!imgUrl) return null;
              return (
                <div key={image._key || image.asset?._ref || index} className="aspect-[4/3] bg-gray-200 rounded overflow-hidden relative group">
                  <Image src={imgUrl} alt={image.alt || "Service gallery image"} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

export const revalidate = 300; // Revalidate every 5 minutes

