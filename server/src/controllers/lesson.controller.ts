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

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required.",
            });
        }

        const course = await CourseModel.findOne({
            slug: req.params.course_slug,
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        const lesson = await LessonModel.create({
            title,
            content,
            slug: slugify(title, { lower: true }),
        });

        course.lessons.push(lesson._id);
        await course.save(); // Save the updated course document

        res.status(201).send({
            success: true,
            lesson,
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
