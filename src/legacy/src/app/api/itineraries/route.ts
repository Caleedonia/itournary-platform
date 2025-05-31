// /home/ubuntu/paradise-partners-project/paradise-partners-frontend/src/app/api/itineraries/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb"; // Ensure this path is correct
import Itinerary, { IItinerary } from "@/models/Itinerary"; // Ensure this path is correct
import User from "@/models/User"; // Ensure this path is correct

const secret = process.env.NEXTAUTH_SECRET;

// GET all itineraries for the logged-in user
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();

  try {
    const itineraries = await Itinerary.find({ userId: token.sub }).sort({ createdAt: -1 });
    return NextResponse.json(itineraries, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch itineraries:", error);
    return NextResponse.json({ message: "Failed to fetch itineraries", error: (error as Error).message }, { status: 500 });
  }
}

// POST a new itinerary for the logged-in user
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { name, description, startDate, endDate, destinations, items } = body;

    if (!name) {
      return NextResponse.json({ message: "Itinerary name is required" }, { status: 400 });
    }

    // Validate user existence (optional, but good practice)
    const user = await User.findById(token.sub);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newItinerary = new Itinerary({
      userId: token.sub,
      name,
      description,
      startDate,
      endDate,
      destinations,
      items: items || [], // Ensure items is an array, even if empty
    });

    await newItinerary.save();
    return NextResponse.json(newItinerary, { status: 201 });
  } catch (error) {
    console.error("Failed to create itinerary:", error);
    return NextResponse.json({ message: "Failed to create itinerary", error: (error as Error).message }, { status: 500 });
  }
}

