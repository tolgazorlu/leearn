import mongoose, { Schema, Model } from "mongoose";
import { ICourse } from "../types/course";

// Define the category schema
const CategorySchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        cover_image: { type: String },
        slug: { type: String },
        description: { type: String },
        lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
        categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
        owner: { type: Schema.Types.ObjectId, ref: "User" },
        teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
        learners: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
    },
);

// Define the category model
const CategoryModel: Model<ICourse> = mongoose.model<ICourse>(
    "Category",
    CategorySchema,
);

// Export the category model
export { CategoryModel, ICourse };
