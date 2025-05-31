// /home/ubuntu/paradise-partners-project/paradise-partners-frontend/src/app/(main)/weddings/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { sanityClient } from "../../../lib/sanityClient"; // Adjust path as needed
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

// Define types for the fetched data based on verticalLandingPage.ts schema
interface CallToAction {
  label?: string;
  link?: string;
}

interface HeroSection {
  heading?: string;
  subheading?: string;
  backgroundImage?: any; // Sanity image asset
  callToAction?: CallToAction;
}

interface ContentSection {
  _key: string;
  heading?: string;
  content?: any[]; // Portable text
  callToAction?: CallToAction;
}

interface FeaturedItem {
  _id: string;
  title?: string;
  slug?: { current?: string };
  mainImage?: any;
  // Add other relevant fields for preview if needed
}

interface VerticalLandingPageData {
  title?: string;
  heroSection?: HeroSection;
  introduction?: any[]; // Portable text
  featuredDestinations?: FeaturedItem[];
  featuredResortsOrVenues?: FeaturedItem[];
  featuredServices?: FeaturedItem[];
  featuredArticles?: FeaturedItem[];
  customSections?: ContentSection[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  if (!source) {
    return undefined;
  }
  return builder.image(source);
}

const WeddingsPage = () => {
  const [pageData, setPageData] = useState<VerticalLandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeddingLandingPageData = async () => {
      try {
        setLoading(true);
        // Fetch the landing page content for the "weddings" vertical
        // Ensure there's a document in Sanity with vertical: "weddings"
        const query = `*[_type == "verticalLandingPage" && vertical == "weddings"][0]{
          title,
          heroSection{
            heading,
            subheading,
            backgroundImage{
                asset->{
                    _id,
                    url
                },
                alt
            },
            callToAction{
                label,
                link
            }
          },
          introduction,
          featuredDestinations[]->{_id, title, slug, mainImage{asset->{_id,url},alt}},
          featuredResortsOrVenues[]->{_id, name, slug, mainImage{asset->{_id,url},alt}},
          featuredServices[]->{_id, name, slug, mainImage{asset->{_id,url},alt}},
          featuredArticles[]->{_id, title, slug, mainImage{asset->{_id,url},alt}},
          customSections[]{
            _key,
            heading,
            content,
            callToAction{
                label,
                link
            }
          },
          seo{
            metaTitle,
            metaDescription
          }
        }`;
        const data = await sanityClient.fetch(query);
        setPageData(data);
        if (data?.seo?.metaTitle) {
          document.title = data.seo.metaTitle;
        }
        // Add meta description if needed
      } catch (err) {
        console.error("Failed to fetch wedding landing page data:", err);
        setError("Failed to load page content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeddingLandingPageData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">Loading Wedding Dreams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">No content found for the Wedding page. Please check back later or contact support if this issue persists.</p>
      </div>
    );
  }

  const renderFeaturedItem = (item: FeaturedItem, type: string) => {
    const itemUrl = item.slug?.current ? `/${type}/${item.slug.current}` : "#";
    return (
      <div key={item._id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105">
        {item.mainImage && (
          <img 
            src={urlFor(item.mainImage)?.width(400).height(300).url()} 
            alt={item.mainImage.alt || item.title || (item as any).name || "Featured item image"} 
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title || (item as any).name}</h3>
          <Link href={itemUrl} className="text-paradise-pink-500 hover:text-paradise-pink-700 font-medium">
            Learn More &rarr;
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 text-gray-800">
      {/* Hero Section */}
      {pageData.heroSection && (
        <div 
          className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white p-4 bg-cover bg-center"
          style={{
            backgroundImage: pageData.heroSection.backgroundImage?.asset?.url 
              ? `url(${pageData.heroSection.backgroundImage.asset.url})` 
              : "url(\"/placeholder-hero-wedding.jpg\")", // Fallback image
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 max-w-3xl">
            {pageData.heroSection.heading && (
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {pageData.heroSection.heading}
              </h1>
            )}
            {pageData.heroSection.subheading && (
              <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
                {pageData.heroSection.subheading}
              </p>
            )}
            {pageData.heroSection.callToAction?.label && pageData.heroSection.callToAction.link && (
              <Link 
                href={pageData.heroSection.callToAction.link} 
                className="bg-paradise-pink-500 hover:bg-paradise-pink-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg transform transition-all hover:scale-105"
              >
                {pageData.heroSection.callToAction.label}
              </Link>
            )}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-12">
        {/* Introduction Section */}
        {pageData.introduction && (
          <section className="mb-16 text-center max-w-3xl mx-auto">
            <div className="prose prose-lg lg:prose-xl text-gray-700">
              <PortableText value={pageData.introduction} />
            </div>
          </section>
        )}

        {/* Featured Destinations */}
        {pageData.featuredDestinations && pageData.featuredDestinations.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Dream Wedding Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.featuredDestinations.map(item => renderFeaturedItem(item, "destinations"))}
            </div>
          </section>
        )}

        {/* Featured Resorts/Venues */}
        {pageData.featuredResortsOrVenues && pageData.featuredResortsOrVenues.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Exquisite Venues & Resorts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.featuredResortsOrVenues.map(item => renderFeaturedItem(item, "resorts"))}
            </div>
          </section>
        )}

        {/* Featured Services */}
        {pageData.featuredServices && pageData.featuredServices.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Essential Wedding Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.featuredServices.map(item => renderFeaturedItem(item, "services"))}
            </div>
          </section>
        )}

        {/* Featured Articles */}
        {pageData.featuredArticles && pageData.featuredArticles.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Wedding Inspiration & Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.featuredArticles.map(item => renderFeaturedItem(item, "articles"))} {/* Assuming articles also have slugs and are under /articles */}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {pageData.customSections && pageData.customSections.map(section => (
          <section key={section._key} className="mb-16 p-8 bg-white rounded-xl shadow-xl">
            {section.heading && <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">{section.heading}</h2>}
            {section.content && (
              <div className="prose prose-lg lg:prose-xl max-w-none text-gray-700 mb-6">
                <PortableText value={section.content} />
              </div>
            )}
            {section.callToAction?.label && section.callToAction.link && (
              <div className="text-center mt-6">
                <Link 
                  href={section.callToAction.link} 
                  className="bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md transform transition-all hover:scale-105"
                >
                  {section.callToAction.label}
                </Link>
              </div>
            )}
          </section>
        ))}
      </main>

      {/* Consider adding a dedicated Footer component if not already in layout */}
    </div>
  );
};

export default WeddingsPage;

