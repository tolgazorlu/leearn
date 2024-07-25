import { NextFunction, Request, Response } from "express";
import { CourseModel } from "../models/course.model";
import slugify from "slugify";
import { LessonModel } from "../models/lesson.model";

module.exports.CreateNewLesson = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { title, content } = req.body;

        const course = await CourseModel.findOne({
            slug: req.params.course_slug,
        });

        const lesson = await LessonModel.create({
            title,
            content,
            slug: slugify(title, { lower: true }),
        });

        if (course) {
            course?.lessons.push({ lesson });
        }

        res.status(201).send(lesson);
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
