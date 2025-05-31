// src/app/(main)/resorts/page.tsx
import Link from 'next/link';
import { fetchData } from '@/lib/sanityClient';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '@/lib/sanityClient';

// Helper to build image URLs from Sanity image assets
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

interface ResortStub {
  _id: string;
  name?: string;
  slug?: { current?: string };
  mainImage?: { asset?: { _ref?: string } };
  briefDescription?: string; // Assuming a brief description field
}

async function getResorts(): Promise<ResortStub[]> {
  const query = `*[_type == "resort"]{ _id, name, slug, mainImage, briefDescription }`;
  const resorts = await fetchData(query);
  return resorts || []; // Ensure it returns an array
}

export default async function ResortsPage() {
  const resorts = await getResorts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Discover Our Exclusive Resorts</h1>
      {resorts && resorts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resorts.map((resort) => (
            resort.slug?.current && (
              <Link key={resort._id} href={`/resorts/${resort.slug.current}`} className="block group">
                <div className="border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-full flex flex-col">
                  {resort.mainImage?.asset ? (
                    <div className="relative w-full h-64">
                      <Image
                        src={urlFor(resort.mainImage).width(600).height(400).auto('format').url()}
                        alt={resort.name || 'Resort image'}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Image not available</span>
                    </div>
                  )}
                  <div className="p-6 bg-white flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300 mb-2 truncate">{resort.name || 'Unnamed Resort'}</h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resort.briefDescription || 'Discover a paradise like no other. More details inside!'}</p>
                    </div>
                    <span className="text-blue-500 group-hover:text-blue-700 font-medium self-start transition-colors duration-300">View Details &rarr;</span>
                  </div>
                </div>
              </Link>
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No resorts found at the moment.</p>
          <p className="text-gray-500 mt-2">Please check back later or ensure resorts are published in the Sanity Studio.</p>
        </div>
      )}
    </div>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds

