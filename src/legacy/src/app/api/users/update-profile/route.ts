// src/app/api/users/update-profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path as necessary
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ success: false, error: "Unauthorized: Not signed in" }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await request.json();
    const { name } = body;

    if (typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ success: false, error: "Name is required and must be a string." }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { name: name.trim() } },
      { new: true, runValidators: true, select: "_id name email role" } // Return updated user, exclude password
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, error: "User not found or update failed." }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated successfully.", 
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
        // @ts-ignore
        role: updatedUser.role
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating user profile:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, error: "Server Error", message: errorMessage }, { status: 500 });
  }
}

