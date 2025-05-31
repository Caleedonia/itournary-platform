// Placeholder for TravelPayouts API integration
// /api/affiliates/travelpayouts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const depart_date = searchParams.get("depart_date");
  const return_date = searchParams.get("return_date");
  const service_type = searchParams.get("service_type") || "flights"; // e.g., flights, hotels

  console.log(`TravelPayouts API call (mock) for ${service_type}, from ${origin} to ${destination}`);

  const mockData = {
    flights: [
      { id: "tp_flight1", airline: "MockAir TP", price: "$280", departure: depart_date, arrival: return_date },
    ],
    hotels: [
      { id: "tp_hotel1", name: "TravelPayouts Hotel Gamma", location: destination || "Mock Destination", price: "$190" },
    ]
  };
  
  let dataToReturn = [];
  if (service_type === "flights") dataToReturn = mockData.flights;
  if (service_type === "hotels") dataToReturn = mockData.hotels;

  return NextResponse.json({ 
    message: `Mock ${service_type} data from TravelPayouts API`, 
    origin,
    destination,
    depart_date,
    return_date,
    data: dataToReturn
  });
}

