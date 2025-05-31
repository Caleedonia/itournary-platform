// src/app/(main)/services/page.tsx
import Link from "next/link";
import { fetchData } from "@/lib/sanityClient";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/lib/sanityClient";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  if (!source || !source.asset) return null;
  return builder.image(source);
}

interface ServiceStub {
  _id: string;
  name?: string;
  slug?: { current?: string };
  mainImage?: { asset?: { _ref?: string }; alt?: string };
  briefDescription?: string;
  category?: string; // Assuming a category field for services
}

async function getServices(): Promise<ServiceStub[]> {
  // Adjust the query based on your actual "service" schema in Sanity
  const query = `*[_type == "service"]{ 
    _id, 
    name, 
    slug, 
    mainImage,
    briefDescription,
    category->{name} // Example: if category is a reference to another document type
  }`;
  const services = await fetchData(query);
  return services || [];
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Explore Our Services</h1>
      {services && services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const serviceImageUrl = service.mainImage ? urlFor(service.mainImage)?.width(600).height(400).auto("format").url() : "/placeholder-service.jpg";
            const serviceImageAlt = service.mainImage?.alt || service.name || "Service image";
            return (
              service.slug?.current && (
                <Link key={service._id} href={`/services/${service.slug.current}`} className="block group">
                  <div className="border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-full flex flex-col">
                    <div className="relative w-full h-64">
                      <Image
                        src={serviceImageUrl}
                        alt={serviceImageAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 bg-white flex-grow flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300 mb-2 truncate">{service.name || "Unnamed Service"}</h2>
                        {service.category && <p className="text-sm text-coral-500 font-medium mb-2">{typeof service.category === 'string' ? service.category : service.category.name}</p>}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.briefDescription || "Unique experiences tailored for you. Click to learn more!"}</p>
                      </div>
                      <span className="text-blue-500 group-hover:text-blue-700 font-medium self-start transition-colors duration-300">View Details &rarr;</span>
                    </div>
                  </div>
                </Link>
              )
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No services found at the moment.</p>
          <p className="text-gray-500 mt-2">Please check back later or ensure services are published in the Sanity Studio.</p>
        </div>
      )}
    </div>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds

