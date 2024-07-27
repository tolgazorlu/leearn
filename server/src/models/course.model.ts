import mongoose, { Schema, Model } from "mongoose";
import { ICourse } from "../types/course";

// Define the category schema
const CourseSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        cover_image: { type: String },
        slug: { type: String, unique: true },
        description: { type: String },
        lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
        owner: { type: Schema.Types.ObjectId, ref: "User" },
        learners: [{ type: Schema.Types.ObjectId, ref: "User" }],
        price: { type: Number },
    },
    {
        timestamps: true,
    },
);

// Define the category model
const CourseModel: Model<ICourse> = mongoose.model<ICourse>(
    "Course",
    CourseSchema,
);

// Export the category model
export { CourseModel, ICourse };
