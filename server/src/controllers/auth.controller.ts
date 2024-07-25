const jwt = require("jsonwebtoken");

/**
 * @desc This file is used to define the auth controllers.
 */

import { NextFunction, Request, Response } from "express"; // Import Request, Response and NextFunction from express
import { UserModel } from "../models/user.model"; // Import the UserModel
import bcrypt from "bcrypt"; // Import bcrypt
import { sendErrorResponse } from "../utils/errorUtils";
import { generateUserToken } from "../utils/token";
const { randomString } = require("../utils/randomString");
const { verifyEmail, sendMagicLink } = require("../services/email");

/**
 * @route POST /v2/api/auth/signup
 */

module.exports.Signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, password } = req.body; // Destructure the email from the request body

        // Check if the email is valid
        if (!email.match(/\S+@\S+\.\S+/)) {
            return sendErrorResponse(res, 400, "Email format is invalid!");
        }

        // Find a user with the email
        const existingUser = await UserModel.findOne({ email });
        // Check if the email is already registered
        if (existingUser) {
            return sendErrorResponse(
                res,
                400,
                "This email is already registered!",
            );
        }

        const addUser = async (email: string, verificationToken: string) => {
            const user = await UserModel.create({
                email: email,
                password: bcrypt.hashSync(password, 10),
                verificationToken: verificationToken,
            }); // Create a new user
            return user; // Return the user
        };

        const emailToken = randomString(20); // Generate a random string of length 20
        const newUser = await addUser(req.body.email, emailToken); // Add a new user

        const link = `${process.env.CLIENT_BASE}${newUser._id}/verify/${emailToken}`; // Create a verification link

        verifyEmail(email, link); // Send a verification email

        res.status(201).json({
            success: true,
            message: "User created successfully! Please verify your email.",
        }); // 201 Created
        next();
    } catch (error) {
        res.status(400).json({
            message: error,
        }); // 400 Bad Request
    }
};

/**
 * @desc VERIFY
 * @route /v2/api/auth/email_verify
 */

module.exports.Verify = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await UserModel.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(400).json({ message: "Link is invalid!" });
        }

        user.email_verified = true;
        user.email_verification_token = "";

        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully!",
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.Signin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Incorrect email or invalid!" });
        }

        if (!user.email_verified) {
            return res
                .status(400)
                .json({ message: "First, you need to verify your email!" });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res
                .status(400)
                .json({ message: "Incorrect password or invalid!" });
        }

        res.status(201).json({
            token: generateUserToken(user),
            role: user.role,
            email: user.email,
        });
        next();
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
