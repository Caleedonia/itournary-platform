import Link from "next/link";

export default function PlanJourneyPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-sand-100 rounded-lg shadow">
        <h1 className="text-4xl font-bold text-ocean-blue-700 mb-4">Plan Your Custom Journey</h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Craft your perfect travel experience with Paradise Partners. Combine resorts, services, and activities into a seamless itinerary. This feature is currently under development.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-ocean-blue-600 mb-4">How It Will Work (Coming Soon)</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>Select your primary destination and travel dates.</li>
          <li>Choose your preferred resort or accommodation.</li>
          <li>Add flights, transportation, and local activities.</li>
          <li>Browse and book services from our network of trusted providers (e.g., photographers, caterers, tour guides).</li>
          <li>Organize everything into a visual timeline and manage your budget.</li>
          <li>Collaborate with fellow travelers or our expert planners.</li>
        </ul>
        <p className="mt-6 text-slate-700">
          We are working hard to bring you a comprehensive journey planning tool. Stay tuned for updates!
        </p>
        <div className="mt-8 text-center">
          <Link href="/resorts" className="bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3 px-6 rounded-md transition-colors">
            Explore Resorts for Now
          </Link>
        </div>
      </section>
    </div>
  );
}

