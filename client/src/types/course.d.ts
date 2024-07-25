import { LessonType } from "./lesson";

export type CourseType = {
    title: string;
    description: string;
    slug: string;
    lessons: LessonType[];
};
