import { NextFunction, Request, Response } from "express";
import { CourseModel } from "../models/course.model";
import slugify from "slugify";

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
            slug: slugify(title, { lower: true }),
            owner: req.user._id,
        }); // Create a new user

        res.status(201).send(course);
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
module.exports.GetSingleCourse = async (req: Request, res: Response) => {
    try {
        const course = await CourseModel.findOne({
            slug: req.params.course_slug,
        }); // Find course

        return res.status(200).send(course);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        }); // 400 Bad Request
    }
};

module.exports.GetLessonsFromCourse = async (req: Request, res: Response) => {
    try {
        const course = await CourseModel.findOne({
            slug: req.params.course_slug,
        }).populate({
            path: "lessons",
        });

        console.log(course);

        return res.status(200).send(course);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        }); // 400 Bad Request
    }
};

module.exports.DeleteCourse = async (req: Request, res: Response) => {
    try {
        const course = await CourseModel.findOneAndDelete({
            slug: req.params.slug,
        }); // Find and delete a course

        res.status(200).send(course);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        }); // 400 Bad Request
    }
};
