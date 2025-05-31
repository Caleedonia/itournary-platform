import Link from "next/link";

export default function WellnessRetreatsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-sand-100 rounded-lg shadow">
        <h1 className="text-4xl font-bold text-ocean-blue-700 mb-4">Wellness Retreats</h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Embark on a transformative journey of self-discovery and rejuvenation. Explore curated wellness programs, serene destinations, and expert practitioners. This section is currently under development.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-ocean-blue-600 mb-4">Features Coming Soon:</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>Directory of wellness retreats and centers.</li>
          <li>Search filters for retreat type, location, duration, and focus (e.g., yoga, meditation, detox).</li>
          <li>Profiles of wellness practitioners and experts.</li>
          <li>Retreat planning tools and customizable itineraries.</li>
          <li>Booking capabilities for retreats and related wellness services.</li>
          <li>Community features for sharing experiences and recommendations.</li>
        </ul>
        <div className="mt-8 text-center">
          <Link href="/resorts" className="bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3 px-6 rounded-md transition-colors mr-4">
            Explore All Resorts
          </Link>
          <Link href="/services" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md transition-colors">
            Find Wellness Services
          </Link>
        </div>
      </section>
    </div>
  );
}

