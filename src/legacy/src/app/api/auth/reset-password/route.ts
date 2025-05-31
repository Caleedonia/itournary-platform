// src/app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { token, password } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ success: false, error: "Reset token is required." }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ success: false, error: "Password is required and must be at least 8 characters long." }, { status: 400 });
    }

    // Hash the received token to compare with the one stored in the database
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne<IUser>({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "Password reset token is invalid or has expired." }, { status: 400 });
    }

    // Set the new password (pre-save hook in User model will hash it)
    user.password = password;
    user.resetPasswordToken = undefined; // Invalidate the token
    user.resetPasswordExpires = undefined; // Remove expiration date
    
    await user.save();

    // Optionally, log the user in automatically after password reset, or prompt them to log in.
    // For simplicity, we will just confirm success and let them log in manually.

    return NextResponse.json({ 
        success: true, 
        message: "Password has been reset successfully. You can now log in with your new password."
      }, { status: 200 });

  } catch (error) {
    console.error("Error in reset-password endpoint:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, error: "Server Error", message: errorMessage }, { status: 500 });
  }
}

