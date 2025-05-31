// src/models/Experience.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IExperienceItem {
  itemType: "resort" | "serviceProvider" | "activity" | "note"; // Extensible
  itemId?: string; // Sanity ID for resort/serviceProvider, or custom ID for activity/note
  name: string; // e.g., Resort Name, Provider Name, Activity Title, Note Title
  description?: string;
  date?: Date;
  startTime?: string;
  endTime?: string;
  status?: "planned" | "booked" | "confirmed" | "pending";
  cost?: number;
  currency?: string;
  notes?: string;
  // Potentially link to specific Sanity documents for more details if needed
  // resortDetails?: { _id: string, name: string, mainImage?: any };
  // serviceProviderDetails?: { _id: string, name: string, serviceType?: string };
}

export interface IExperience extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  experienceName: string;
  occasionTypeId: string; // Reference to Sanity OccasionType document ID
  occasionTypeName?: string; // Denormalized for easier display
  startDate?: Date;
  endDate?: Date;
  destination?: string; // Could be a free text or linked to a Destination schema later
  notes?: string;
  items: IExperienceItem[];
  totalEstimatedCost?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceItemSchema: Schema<IExperienceItem> = new Schema({
  itemType: { type: String, required: true, enum: ["resort", "serviceProvider", "activity", "note"] },
  itemId: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  startTime: { type: String }, // e.g., "10:00 AM"
  endTime: { type: String },   // e.g., "05:00 PM"
  status: { type: String, enum: ["planned", "booked", "confirmed", "pending"], default: "planned" },
  cost: { type: Number },
  currency: { type: String, default: "USD" },
  notes: { type: String },
});

const ExperienceSchema: Schema<IExperience> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming your User model is named "User"
      required: true,
    },
    experienceName: {
      type: String,
      required: true,
      trim: true,
    },
    occasionTypeId: {
      type: String, // Storing Sanity Document ID as string
      required: true,
    },
    occasionTypeName: { // Denormalized for display convenience
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    destination: {
      type: String, // Simple text for now
      trim: true,
    },
    notes: {
      type: String,
    },
    items: [ExperienceItemSchema],
    totalEstimatedCost: {
        type: Number,
        default: 0
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// Index for efficient querying by user
ExperienceSchema.index({ userId: 1, createdAt: -1 });

const Experience: Model<IExperience> = mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;

