// Placeholder for Expedia API integration
// /api/affiliates/expedia
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // In a real scenario, you would fetch data from Expedia API
  // For now, returning mock data
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const type = searchParams.get("type") || "hotels"; // e.g., hotels, flights, packages

  console.log(`Expedia API call (mock) for type: ${type}, query: ${query}`);

  const mockData = {
    hotels: [
      { id: "exp1", name: "Expedia Hotel A", location: "Mock Location", price: "$200" },
      { id: "exp2", name: "Expedia Hotel B", location: "Mock Location", price: "$250" },
    ],
    flights: [
      { id: "expf1", from: "JFK", to: "LAX", price: "$300", airline: "MockAir" },
    ],
    packages: [
      { id: "expp1", name: "Mock Package Deal", components: ["Hotel", "Flight"], price: "$500"}
    ]
  };

  let dataToReturn = [];
  if (type === "hotels") dataToReturn = mockData.hotels;
  if (type === "flights") dataToReturn = mockData.flights;
  if (type === "packages") dataToReturn = mockData.packages;

  return NextResponse.json({ 
    message: `Mock data from Expedia API for ${type}`, 
    query,
    data: dataToReturn 
  });
}

