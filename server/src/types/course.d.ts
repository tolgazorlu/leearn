import { IUser } from "./user";

// Define the course interface
interface ICourse extends Document {
    title: string;
    description: string;
    cover_image: string;
    slug: string;
    owner: IUser;
    teachers: IUser[];
    learners: IUser[];
    categories: ICategory[];
    lessons: ILesson[];
}
