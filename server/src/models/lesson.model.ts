import mongoose, { Schema, Model } from "mongoose";
import { ILesson } from "../types/lesson";

// Define the category schema
const LessonSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, unique: true },
        content: { type: String },
    },
    {
        timestamps: true,
    },
);

// Define the category model
const LessonModel: Model<ILesson> = mongoose.model<ILesson>(
    "Lesson",
    LessonSchema,
);

// Export the category model
export { LessonModel, ILesson };
