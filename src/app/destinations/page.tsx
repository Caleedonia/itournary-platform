import Header from '@/components/Header';
import Link from 'next/link';

export default function DestinationsPage() {
  // Sample destinations data
  const destinations = [
    {
      id: 'paris',
      name: 'Paris, France',
      description: 'The City of Light features iconic landmarks like the Eiffel Tower and world-class cuisine.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 'tokyo',
      name: 'Tokyo, Japan',
      description: 'A fascinating blend of the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 'santorini',
      name: 'Santorini, Greece',
      description: 'Famous for its dramatic views, stunning sunsets, white-washed houses, and blue-domed churches.',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 'bali',
      name: 'Bali, Indonesia',
      description: 'Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 'rome',
      name: 'Rome, Italy',
      description: 'The Eternal City is famous for its historic landmarks, cuisine, and vibrant street life.',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 'nyc',
      name: 'New York City, USA',
      description: 'The Big Apple features iconic sites like Times Square, the Statue of Liberty, and Central Park.',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Popular Destinations
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Explore some of the world's most captivating destinations and start planning your next adventure.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 w-full relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {destination.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {destination.description}
                </p>
                <Link
                  href={`/destinations/${destination.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Explore destination →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
