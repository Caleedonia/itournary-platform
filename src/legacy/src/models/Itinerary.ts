// /home/ubuntu/paradise-partners-project/paradise-partners-frontend/src/models/Itinerary.ts
import mongoose, { Document, Schema, Types } from "mongoose";

// Interface for an Itinerary Item (Resort, Service, or Custom Note)
export interface IItineraryItem extends Document {
  itemType: "Resort" | "Service" | "Note";
  itemId?: string; // Sanity ID for Resort or Service
  itemName?: string; // Name of the resort/service, or title for a custom note
  itemDescription?: string; // Optional description or custom note content
  startDate?: Date;
  endDate?: Date;
  customOrder?: number; // For manual ordering within a day or itinerary
}

const ItineraryItemSchema = new Schema<IItineraryItem>({
  itemType: { type: String, enum: ["Resort", "Service", "Note"], required: true },
  itemId: { type: String }, // Not required for custom notes
  itemName: { type: String, required: true },
  itemDescription: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  customOrder: { type: Number, default: 0 },
});

// Interface for the main Itinerary document
export interface IItinerary extends Document {
  userId: Types.ObjectId; // Link to the User model
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  destinations?: string[]; // Array of destination names or IDs
  items: IItineraryItem[];
  isPublic?: boolean; // For future sharing features
  createdAt: Date;
  updatedAt: Date;
}

const ItinerarySchema = new Schema<IItinerary>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    destinations: [{ type: String }],
    items: [ItineraryItemSchema], // Embed itinerary items
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Avoid recompiling the model if it already exists
export default mongoose.models.Itinerary || mongoose.model<IItinerary>("Itinerary", ItinerarySchema);

