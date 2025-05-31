// src/app/api/users/favorites/service-providers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // Assuming User model stores an array of favorite provider IDs
import FavoriteProvider, { IFavoriteProvider } from "@/models/FavoriteProvider"; // Specific model for favorites

const secret = process.env.NEXTAUTH_SECRET;

// GET user's favorite service providers
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const user = await User.findById(token.sub);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Fetch favorites from the dedicated FavoriteProvider collection
    const favorites = await FavoriteProvider.find({ user: token.sub }).select("serviceProvider -_id");
    const favoriteProviderIds = favorites.map(fav => fav.serviceProvider);
    
    return NextResponse.json({ favoriteServiceProviders: favoriteProviderIds }, { status: 200 });

  } catch (error) {
    console.error("Error fetching favorite service providers:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// POST to add or remove a favorite service provider
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { providerId, action } = await req.json(); // action: "add" or "remove"

    if (!providerId || !action) {
      return NextResponse.json({ message: "Missing providerId or action" }, { status: 400 });
    }

    const userId = token.sub;

    if (action === "add") {
      // Check if already favorited to prevent duplicates
      const existingFavorite = await FavoriteProvider.findOne({ user: userId, serviceProvider: providerId });
      if (existingFavorite) {
        return NextResponse.json({ message: "Provider already favorited" }, { status: 200 }); // Or 409 Conflict
      }
      await FavoriteProvider.create({ user: userId, serviceProvider: providerId });
      return NextResponse.json({ message: "Provider added to favorites" }, { status: 201 });
    } else if (action === "remove") {
      const result = await FavoriteProvider.deleteOne({ user: userId, serviceProvider: providerId });
      if (result.deletedCount === 0) {
        return NextResponse.json({ message: "Favorite not found or already removed"}, { status: 404 });
      }
      return NextResponse.json({ message: "Provider removed from favorites" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

  } catch (error) {
    console.error("Error updating favorite service providers:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

