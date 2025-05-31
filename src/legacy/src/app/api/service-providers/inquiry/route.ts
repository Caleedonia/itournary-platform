// src/app/api/service-providers/inquiry/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb";
import ProviderInquiry from "@/models/ProviderInquiry";
import User from "@/models/User"; // To get user contact details if needed

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const {
      serviceProviderId,
      resortId,
      destinationId,
      eventName,
      eventDate,
      numberOfGuests,
      message,
      contactPreference
    } = await req.json();

    if (!serviceProviderId || !message) {
      return NextResponse.json({ message: "Missing required fields: serviceProviderId and message" }, { status: 400 });
    }

    const user = await User.findById(token.sub).select("email name"); // Fetch user details
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newInquiry = new ProviderInquiry({
      user: token.sub,
      serviceProvider: serviceProviderId,
      resort: resortId || undefined,
      destination: destinationId || undefined,
      eventName: eventName || undefined,
      eventDate: eventDate || undefined,
      numberOfGuests: numberOfGuests || undefined,
      message,
      contactPreference: contactPreference || undefined,
      userContactEmail: user.email, // Capture user email at time of inquiry
      // userContactPhone: user.phone, // If phone is available on user model
      status: "submitted",
    });

    await newInquiry.save();

    // TODO: Implement notification to the service provider (e.g., via email) if applicable
    // This would likely involve a separate notification service or direct email sending.

    return NextResponse.json({ message: "Inquiry submitted successfully", inquiryId: newInquiry._id }, { status: 201 });

  } catch (error) {
    console.error("Error submitting provider inquiry:", error);
    // Check for Mongoose validation errors to provide more specific feedback
    if (error instanceof Error && error.name === "ValidationError") {
        return NextResponse.json({ message: "Validation Error", errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Optional: GET route for users to view their submitted inquiries (or for admin/providers to view received inquiries)
// This would require more complex logic based on user roles.
// For now, focusing on POST.

