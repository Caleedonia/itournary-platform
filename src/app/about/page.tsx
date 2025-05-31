import Header from '@/components/Header';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About iTournary
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Your personal travel companion for planning unforgettable journeys
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-12">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              iTournary was born from a passion for travel and a desire to make trip planning simpler and more enjoyable. 
              Our platform helps travelers create personalized itineraries, discover unique experiences, 
              and connect with a global community of fellow adventurers.
            </p>
            <p className="text-lg text-gray-600">
              Whether you're planning a weekend getaway or a multi-country expedition, 
              iTournary provides the tools and inspiration you need to create memorable journeys.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To empower travelers to create meaningful experiences by providing 
              intuitive tools and a supportive community.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become the world's most trusted platform for personalized travel planning 
              and authentic travel experiences.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
            <p className="text-gray-600">
              Authenticity, sustainability, cultural respect, and the transformative 
              power of travel guide everything we do.
            </p>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-12">
          <div className="px-4 py-5 sm:p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Journey Today</h2>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of travelers who are planning their next adventure with iTournary.
            </p>
            <Link 
              href="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
