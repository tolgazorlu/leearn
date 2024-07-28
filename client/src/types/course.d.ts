import { LessonType } from "./lesson";
import { UserInfo } from "./UserInfo";

export type CourseType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any;
    _id: string;
    title: string;
    description: string;
    slug: string;
    lessons: LessonType[];
    price: number;
    owner: UserInfo;
};
