import { LessonType } from "./lesson";

export type CourseType = {
    _id: string;
    title: string;
    firstname: string;
    lastname: string;
    description: string;
    slug: string;
    lessons: LessonType[];
    price: number;
};
