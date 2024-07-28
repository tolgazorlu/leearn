import { Document, Types } from "mongoose";
import { ICourse } from "./course";

// Define the user interface
interface IUser extends Document {
    firstname: string;
    lastname: string;
    avatar: string;
    email: string;
    password: string;
    role?: Role;
    education: string;
    job: string;
    age: number;
    enrolled_courses: Types.ObjectId[];
    email_verified: boolean;
    email_verification_token: string;
    reset_password_token?: string;
    reset_password_expires?: Date;
    magic_link?: string;
    magic_link_expired: boolean;
    user_token: string;
    encryption_key: string;
    challange_id: string;
    user_app_id: string;
    wallet_id: string;
    wallet_address: string;
    wallet_user_id: string;
}

// Define the social link interface
interface ISocialLink {
    platform: string;
    url: string;
}
