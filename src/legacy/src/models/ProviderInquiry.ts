// src/models/ProviderInquiry.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProviderInquiry extends Document {
  user: Types.ObjectId; // Reference to the User making the inquiry
  serviceProvider: string; // Sanity ID of the ServiceProvider being inquired about
  resort?: Types.ObjectId; // Optional: Reference to a Resort if inquiry is related to one
  destination?: Types.ObjectId; // Optional: Reference to a Destination if inquiry is related to one
  eventName?: string; // E.g., "Smith Wedding", "Corporate Retreat Q3"
  eventDate?: Date;
  numberOfGuests?: number;
  message: string; // User's message to the provider
  status: "submitted" | "read" | "replied" | "archived"; // Status of the inquiry
  contactPreference?: "email" | "phone";
  userContactEmail?: string; // Stored at time of inquiry, in case user changes their primary email later
  userContactPhone?: string; // Stored at time of inquiry
  createdAt: Date;
  updatedAt: Date;
}

const ProviderInquirySchema: Schema<IProviderInquiry> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceProvider: {
      type: String, // Sanity ID of the ServiceProvider
      required: true,
    },
    resort: {
      type: Schema.Types.ObjectId,
      ref: "Resort", // Assuming you have a Resort model in Mongoose for other purposes
      required: false,
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: "Destination", // Assuming you have a Destination model in Mongoose
      required: false,
    },
    eventName: {
      type: String,
      trim: true,
    },
    eventDate: {
      type: Date,
    },
    numberOfGuests: {
      type: Number,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["submitted", "read", "replied", "archived"],
      default: "submitted",
    },
    contactPreference: {
      type: String,
      enum: ["email", "phone"],
    },
    userContactEmail: {
        type: String,
    },
    userContactPhone: {
        type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export default mongoose.models.ProviderInquiry || mongoose.model<IProviderInquiry>("ProviderInquiry", ProviderInquirySchema);

