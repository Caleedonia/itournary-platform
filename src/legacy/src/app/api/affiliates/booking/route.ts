// Placeholder for Booking.com API integration
// /api/affiliates/booking
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  console.log(`Booking.com API call (mock) for destination: ${destination}, checkin: ${checkin}, checkout: ${checkout}`);

  const mockHotels = [
    { id: "book1", name: "Booking.com Hotel Alpha", location: destination || "Mock City", price: "$180" },
    { id: "book2", name: "Booking.com Hotel Beta", location: destination || "Mock City", price: "$220" },
  ];

  return NextResponse.json({ 
    message: "Mock hotel data from Booking.com API", 
    destination,
    checkin,
    checkout,
    data: mockHotels 
  });
}

