// /home/ubuntu/paradise-partners-project/paradise-partners-frontend/src/app/api/itineraries/[itineraryId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb";
import Itinerary, { IItinerary } from "@/models/Itinerary";

const secret = process.env.NEXTAUTH_SECRET;

// GET a specific itinerary by ID
export async function GET(req: NextRequest, { params }: { params: { itineraryId: string } }) {
  const token = await getToken({ req, secret });
  if (!token || !token.sub) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();
  const { itineraryId } = params;

  try {
    const itinerary = await Itinerary.findOne({ _id: itineraryId, userId: token.sub });
    if (!itinerary) {
      return NextResponse.json({ message: "Itinerary not found or access denied" }, { status: 404 });
    }
    return NextResponse.json(itinerary, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch itinerary:", error);
    return NextResponse.json({ message: "Failed to fetch itinerary", error: (error as Error).message }, { status: 500 });
  }
}

// PUT (update) a specific itinerary by ID
export async function PUT(req: NextRequest, { params }: { params: { itineraryId: string } }) {
  const token = await getToken({ req, secret });
  if (!token || !token.sub) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();
  const { itineraryId } = params;

  try {
    const body = await req.json();
    // Ensure that userId is not updated from the body for security
    const { userId, ...updateData } = body;

    const updatedItinerary = await Itinerary.findOneAndUpdate(
      { _id: itineraryId, userId: token.sub },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItinerary) {
      return NextResponse.json({ message: "Itinerary not found or access denied" }, { status: 404 });
    }
    return NextResponse.json(updatedItinerary, { status: 200 });
  } catch (error) {
    console.error("Failed to update itinerary:", error);
    return NextResponse.json({ message: "Failed to update itinerary", error: (error as Error).message }, { status: 500 });
  }
}

// DELETE a specific itinerary by ID
export async function DELETE(req: NextRequest, { params }: { params: { itineraryId: string } }) {
  const token = await getToken({ req, secret });
  if (!token || !token.sub) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();
  const { itineraryId } = params;

  try {
    const deletedItinerary = await Itinerary.findOneAndDelete({ _id: itineraryId, userId: token.sub });
    if (!deletedItinerary) {
      return NextResponse.json({ message: "Itinerary not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Itinerary deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete itinerary:", error);
    return NextResponse.json({ message: "Failed to delete itinerary", error: (error as Error).message }, { status: 500 });
  }
}

