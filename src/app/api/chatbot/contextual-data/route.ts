import { NextResponse } from "next/server";

// Mock destination data
const destinationData = {
  "paris": {
    name: "Paris",
    country: "France",
    bestTimeToVisit: "April to June, September to November",
    knownFor: ["Eiffel Tower", "Louvre Museum", "Notre Dame Cathedral", "French cuisine"],
    transport: "Extensive metro system, buses, and walkable city center"
  },
  "tokyo": {
    name: "Tokyo",
    country: "Japan",
    bestTimeToVisit: "March to May, September to November",
    knownFor: ["Tokyo Tower", "Imperial Palace", "Shibuya Crossing", "Sushi"],
    transport: "Efficient train and subway system, taxis"
  },
  "new york": {
    name: "New York City",
    country: "United States",
    bestTimeToVisit: "April to June, September to November",
    knownFor: ["Times Square", "Statue of Liberty", "Central Park", "Broadway shows"],
    transport: "Subway, buses, taxis, and rideshares"
  },
  "rome": {
    name: "Rome",
    country: "Italy",
    bestTimeToVisit: "April to June, September to October",
    knownFor: ["Colosseum", "Vatican City", "Roman Forum", "Italian cuisine"],
    transport: "Metro, buses, and walkable historic center"
  },
  "bali": {
    name: "Bali",
    country: "Indonesia",
    bestTimeToVisit: "April to October (dry season)",
    knownFor: ["Beautiful beaches", "Temples", "Rice terraces", "Surfing"],
    transport: "Scooter rentals, private drivers, limited public transport"
  }
};

export async function GET(request: Request) {
  // Get destination from URL
  const url = new URL(request.url);
  const destination = url.searchParams.get('destination')?.toLowerCase() || '';
  
  // Find matching destination data
  let data = null;
  for (const [key, value] of Object.entries(destinationData)) {
    if (destination.includes(key)) {
      data = value;
      break;
    }
  }
  
  // If no match, return generic data
  if (!data) {
    data = {
      name: destination.charAt(0).toUpperCase() + destination.slice(1),
      country: "Unknown",
      bestTimeToVisit: "Varies by season",
      knownFor: ["Local attractions", "Regional cuisine", "Cultural experiences"],
      transport: "Research local transportation options"
    };
  }
  
  // Simulate a delay for a more realistic experience
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return NextResponse.json({ data });
}
