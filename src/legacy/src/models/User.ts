// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
  email: string;
  name?: string;
  password?: string; // For credentials-based auth
  role?: "admin" | "editor" | "member" | "guest"; // Define roles
  authProviderId?: string; // e.g., Google ID, GitHub ID for OAuth
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  favoriteResorts?: mongoose.Types.ObjectId[]; // Array of Resort ObjectIds
  favoriteServices?: mongoose.Types.ObjectId[]; // Array of Service ObjectIds
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email for the user."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      // Required only if not using an OAuth provider, can be handled in logic
    },
    role: {
      type: String,
      enum: ["admin", "editor", "member", "guest"],
      default: "member",
    },
    authProviderId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values, but unique if a value exists
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    favoriteResorts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resort", // Assuming your Resort model is named "Resort"
      },
    ],
    favoriteServices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service", // Assuming your Service model is named "Service"
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Pre-save hook to hash password before saving a new user or when password changes
UserSchema.pre<IUser>("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    // Ensure err is an Error object before passing to next
    if (err instanceof Error) {
      return next(err);
    } 
    return next(new Error("Error hashing password"));
  }
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

