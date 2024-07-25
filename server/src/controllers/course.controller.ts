import { NextFunction, Request, Response } from "express";
import { CourseModel } from "../models/course.model";

module.exports.CreateNewCourse = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { title, description } = req.body;

        const course = await CourseModel.create({
            title: title,
            description: description,
        }); // Create a new user

        res.status(201).json({
            success: true,
            message: "Course created successfully!",
            data: course,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        }); // 400 Bad Request
    }
};

module.exports.GetCourses = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const courses = await CourseModel.find(); // Find all courses

        res.status(200).send(courses);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        }); // 400 Bad Request
    }
};
