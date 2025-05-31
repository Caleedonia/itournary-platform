import Link from "next/link";

export default function CorporateIncentivesPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-sand-100 rounded-lg shadow">
        <h1 className="text-4xl font-bold text-ocean-blue-700 mb-4">Corporate Incentive Travel</h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Design exceptional incentive trips that motivate your team and reward performance. Explore unique destinations and experiences tailored for corporate groups. This section is currently under development.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-ocean-blue-600 mb-4">Features Coming Soon:</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>Resorts and venues suitable for corporate groups and events.</li>
          <li>Group booking capabilities and management tools.</li>
          <li>Meeting space comparison and booking.</li>
          <li>Team-building activities and unique local experiences.</li>
          <li>Customizable itinerary planning for corporate needs.</li>
          <li>Reporting and budget management features for event organizers.</li>
        </ul>
        <div className="mt-8 text-center">
          <Link href="/resorts" className="bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3 px-6 rounded-md transition-colors mr-4">
            Explore All Resorts
          </Link>
          <Link href="/services" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md transition-colors">
            Find Event Services
          </Link>
        </div>
      </section>
    </div>
  );
}

