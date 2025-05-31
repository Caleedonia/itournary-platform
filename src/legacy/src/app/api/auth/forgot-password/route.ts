// src/app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
// import { sendPasswordResetEmail } from "@/lib/emailService"; // Placeholder for actual email sending

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const user = await User.findOne<IUser>({ email });

    if (!user) {
      // Important: Do not reveal if an email is registered or not for security reasons.
      // Send a generic success message regardless.
      console.log(`Password reset requested for non-existent email: ${email}`);
      return NextResponse.json({ 
        success: true, 
        message: "If an account with that email exists, a password reset link has been sent."
      }, { status: 200 });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour

    user.resetPasswordToken = passwordResetToken;
    user.resetPasswordExpires = passwordResetExpires;
    await user.save();

    // Construct reset URL (replace with your actual frontend domain in production)
    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password/${resetToken}`;

    // --- !!! Email Sending Placeholder !!! ---
    // In a real application, you would send an email here.
    // For now, we will log the reset URL to the console for testing.
    console.log(`Password Reset URL (for testing - normally sent via email): ${resetUrl}`);
    // try {
    //   await sendPasswordResetEmail(user.email, resetUrl);
    // } catch (emailError) {
    //   console.error("Failed to send password reset email:", emailError);
    //   // Even if email fails, don't reveal it to the client. Log internally.
    //   // The user record is already updated with the token.
    // }
    // --- End Email Sending Placeholder ---

    return NextResponse.json({ 
        success: true, 
        message: "If an account with that email exists, a password reset link has been sent."
      }, { status: 200 });

  } catch (error) {
    console.error("Error in forgot-password endpoint:", error);
    // Generic error for client, specific error logged server-side
    return NextResponse.json({ success: false, error: "An error occurred while processing your request." }, { status: 500 });
  }
}

