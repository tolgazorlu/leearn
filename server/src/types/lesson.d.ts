import { IUser } from "./user";

// Define the course interface
interface ILesson extends Document {
    title: string;
    slug: string;
    content: string;
}
