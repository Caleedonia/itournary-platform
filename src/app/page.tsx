import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="flex flex-col items-center p-8 md:p-24">
        {/* Hero Section */}
        <div className="z-10 w-full max-w-5xl flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            iTournary
          </h1>
          <p className="text-xl text-center max-w-2xl mb-12 text-gray-600">
            Your personal travel experience platform - plan, discover, and create memorable journeys
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-16">
          <div className="group rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-500 hover:shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Plan Your Trip
            </h2>
            <p className="text-gray-600">
              Create personalized itineraries tailored to your preferences and travel style. Organize activities, accommodation, and transportation in one place.
            </p>
          </div>

          <div className="group rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-500 hover:shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Discover Experiences
            </h2>
            <p className="text-gray-600">
              Explore unique activities, hidden gems, and authentic local experiences for your next adventure. Get inspired by curated recommendations.
            </p>
          </div>

          <div className="group rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-500 hover:shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Connect with Travelers
            </h2>
            <p className="text-gray-600">
              Share your journeys, get advice from fellow travelers, and connect with a community of passionate explorers around the world.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center w-full max-w-3xl bg-blue-50 p-8 rounded-xl border border-blue-100">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Start Planning Today</h2>
          <p className="text-lg text-blue-600 mb-6">
            Create your free account and begin planning your next adventure!
          </p>
          <Link href="/signup" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Sign Up Free
          </Link>
        </div>
      </div>
    </main>
  );
}
