// src/models/FavoriteProvider.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFavoriteProvider extends Document {
  user: Types.ObjectId; // Reference to the User who favorited
  serviceProvider: string; // Sanity document ID of the ServiceProvider that was favorited
  createdAt: Date;
}

const FavoriteProviderSchema: Schema<IFavoriteProvider> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceProvider: {
      type: String, // Storing Sanity ID as string, as per user feedback
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Only createdAt is explicitly needed
  }
);

// Index to ensure a user can only favorite a provider once
FavoriteProviderSchema.index({ user: 1, serviceProvider: 1 }, { unique: true });

export default mongoose.models.FavoriteProvider || mongoose.model<IFavoriteProvider>("FavoriteProvider", FavoriteProviderSchema);

