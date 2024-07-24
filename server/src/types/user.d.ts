import { Document } from "mongoose";
import { ICourse } from "./course";

// Define the user interface
interface IUser extends Document {
    firstname: string;
    lastname: string;
    avatar: string;
    email: string;
    role?: Role;
    education: string;
    job: string;
    age: number;
    enrolled_courses: ICourse[];
    email_verified: boolean;
    email_verification_token: string;
    reset_password_token?: string;
    reset_password_expires?: Date;
    magic_link?: string;
    magic_link_expired: boolean;
}

// Define the social link interface
interface ISocialLink {
    platform: string;
    url: string;
}
