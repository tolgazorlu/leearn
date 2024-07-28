/**
 * @desc This model is used to define the user schema and model.
 */

import mongoose, { Schema, Model } from "mongoose"; // IMPORT Mongoose
import { IUser } from "../types/user";
const { v4: uuidv4 } = require("uuid");

// Define the user roles
export enum Role {
    SuperAdmin = "super-admin",
    Admin = "admin",
    Teacher = "teacher",
    User = "learner",
}

// Define the social link schema
const SocialLinkSchema: Schema = new Schema(
    {
        platform: { type: String },
        url: { type: String },
    },
    { _id: false }, // Disable _id for subdocuments
);

// Define the user schema
const UserSchema: Schema = new Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        avatar: { type: String },
        email: { type: String, required: true, unique: true },
        education: { type: String },
        password: { type: String },
        job: { type: String },
        age: { type: Number },
        social_links: { SocialLinkSchema },
        role: { type: String, enum: Object.values(Role), default: Role.User },
        enrolled_courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
        // Email verification fields
        email_verified: { type: Boolean, default: false },
        email_verification_token: { type: String },
        // Reset password token and expiry
        reset_password_token: { type: String },
        reset_password_expired: { type: Boolean, default: false },
        // Magic link for passwordless login
        magic_link: { type: String, default: uuidv4 },
        magic_link_expired: { type: Boolean, default: false },
        // Wallet
        user_token: { type: String },
        encryption_key: { type: String },
        challange_id: { type: String },
        wallet_id: { type: String },
        wallet_address: { type: String },
        wallet_user_id: { type: String },
    },
    {
        timestamps: true,
    },
);

// Define the user model
const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

// Export the user model
export { UserModel, IUser };
