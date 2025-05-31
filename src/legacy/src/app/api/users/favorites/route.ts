// src/app/api/users/favorites/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path as needed
import dbConnect from "@/lib/mongodb"; // Your MongoDB connection utility
import User from "@/models/User"; // Your User model
import mongoose from "mongoose";

// Helper to check if a string is a valid ObjectId
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// GET user favorites
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const user = await User.findById(session.user.id)
      .populate("favoriteResorts") // Populate with actual resort data if needed, or just send IDs
      .populate("favoriteServices"); // Populate with actual service data if needed

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      favoriteResorts: user.favoriteResorts || [],
      favoriteServices: user.favoriteServices || [],
    });
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

// POST to add or remove a favorite
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { itemId, itemType, action } = await request.json(); // itemType: "resort" or "service", action: "add" or "remove"

    if (!itemId || !itemType || !action) {
      return NextResponse.json({ error: "Missing required fields (itemId, itemType, action)" }, { status: 400 });
    }

    if (!isValidObjectId(itemId)) {
        return NextResponse.json({ error: "Invalid itemId format" }, { status: 400 });
    }

    if (itemType !== "resort" && itemType !== "service") {
      return NextResponse.json({ error: "Invalid itemType. Must be \"resort\" or \"service\"." }, { status: 400 });
    }

    if (action !== "add" && action !== "remove") {
      return NextResponse.json({ error: "Invalid action. Must be \"add\" or \"remove\"." }, { status: 400 });
    }

    await dbConnect();
    const userId = session.user.id;
    let update;

    if (itemType === "resort") {
      update = action === "add"
        ? { $addToSet: { favoriteResorts: new mongoose.Types.ObjectId(itemId) } } // $addToSet prevents duplicates
        : { $pull: { favoriteResorts: new mongoose.Types.ObjectId(itemId) } };
    } else { // itemType === "service"
      update = action === "add"
        ? { $addToSet: { favoriteServices: new mongoose.Types.ObjectId(itemId) } }
        : { $pull: { favoriteServices: new mongoose.Types.ObjectId(itemId) } };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found or failed to update favorites" }, { status: 404 });
    }

    return NextResponse.json({
      message: `Successfully ${action === "add" ? "added" : "removed"} ${itemType} favorite.`,
      favoriteResorts: updatedUser.favoriteResorts,
      favoriteServices: updatedUser.favoriteServices,
    });

  } catch (error) {
    console.error("Failed to update favorites:", error);
    return NextResponse.json({ error: "Failed to update favorites" }, { status: 500 });
  }
}

