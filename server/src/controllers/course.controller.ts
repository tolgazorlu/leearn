import { NextFunction, Request, Response } from "express";
import { CourseModel } from "../models/course.model";
import slugify from "slugify";
import { UserModel } from "../models/user.model";
const { v4: uuidv4 } = require("uuid");
import axios from "axios";

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
        const courses = await CourseModel.find().populate(
            "owner",
            "-_id -email -password -role -enrolled_courses -email_verified -reset_password_expired -magic_link_expired -magic_link",
        ); // Find all courses

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

module.exports.UpdateCourse = async (req: Request, res: Response) => {
    try {
        const { title, price, slug, description } = req.body;
        const course = await CourseModel.findOne({ slug: req.params.slug });

        if (course) {
            course.title = title;
            course.price = price;
            course.slug = slug;
            course.description = description;

            course.save();
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully!",
            course,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        }); // 400 Bad Request
    }
};

// module.exports.GetBalanced = async (req: Request, res: Response) => {
//     try {
//         const user = await UserModel.findById(req.user._id);

//         const options = {
//             method: "GET",
//             url: `https://api.circle.com/v1/w3s/wallets/${user?.wallet_id}/balances`,
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
//             },
//         };

//         const response = await axios.request(options);
//         console.log(response);
//     } catch (error) {
//         return res.status(404).json({
//             success: false,
//             message: error,
//         });
//     }
// };

module.exports.EnrollCourse = async (req: Request, res: Response) => {
    try {
        // Validate request parameters
        const { course_slug } = req.body;
        const userId = req.user._id;

        // Fetch course by slug
        const course = await CourseModel.findOne({
            slug: course_slug,
        }).populate("owner");
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        // Fetch user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Get user's wallet balance
        const getBalancedOptions = {
            method: "GET",
            url: `https://api.circle.com/v1/w3s/wallets/${user.wallet_id}/balances`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
            },
        };

        const getBalancedRes = await axios.request(getBalancedOptions);
        console.log("Token balances: ", getBalancedRes.data.data.tokenBalances);

        const usdc_token_id =
            getBalancedRes.data.data.tokenBalances[0].token.id;
        console.log("udsctoken:", usdc_token_id);

        const idempotencyKey = uuidv4();

        // Transfer transaction to course owner
        const options = {
            method: "POST",
            url: "https://api.circle.com/v1/w3s/user/transactions/transfer",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
                "X-User-Token": user.user_token,
            },
            data: {
                idempotencyKey: idempotencyKey,
                userId: user.wallet_user_id,
                destinationAddress: course.owner.wallet_address,
                refId: "Course Buy",
                amounts: ["2"],
                feeLevel: "HIGH",
                tokenId: usdc_token_id,
                walletId: user.wallet_id,
            },
        };

        const response = await axios.request(options);
        console.log(response);

        // Check if user is already enrolled
        if (course.learners.includes(user._id)) {
            return res.status(400).json({
                success: false,
                message: "User is already enrolled in this course.",
            });
        }

        // Enroll user in course
        course.learners.push(user._id);
        await course.save(); // Save the updated course document

        user.enrolled_courses.push(course._id);
        await user.save();

        res.status(200).json({
            success: true,
            message: "User enrolled in course successfully.",
            course,
        });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({
            success: false,
            message: error || "Internal Server Error",
        });
    }
};
