const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
/**
 * @desc This file is used to define the auth controllers.
 */

import { NextFunction, Request, Response } from "express"; // Import Request, Response and NextFunction from express
import { UserModel } from "../models/user.model"; // Import the UserModel
import bcrypt from "bcrypt"; // Import bcrypt
import { sendErrorResponse } from "../utils/errorUtils";
import { generateUserToken } from "../utils/token";
import axios from "axios";
import { Message } from "node-mailjet";
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
            user_token: user.user_token,
            encryption_key: user.encryption_key,
            challange_id: user.challange_id,
            user_app_id: user.user_app_id,
        });
        next();
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.GetAppID = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const options = {
            method: "GET",
            url: "https://api.circle.com/v1/w3s/config/entity",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
            },
        };

        const response = await axios.request(options);

        res.status(200).json({ appId: response.data.data.appId });

        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.CreateWallet = async (req: Request, res: Response) => {
    try {
        // const createWalletOption = {
        //     method: "POST",
        //     url: "https://api.circle.com/v1/w3s/users",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
        //     },
        //     data: { userId: req.user._id },
        // };

        // const createWalletRes = await axios.request(createWalletOption);
        // console.log(createWalletRes);

        const AcquireSessionTokenOption = {
            method: "POST",
            url: "https://api.circle.com/v1/w3s/users/token",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
            },
            data: { userId: req.user._id },
        };

        const acquireSessionRes = await axios.request(
            AcquireSessionTokenOption,
        );
        const user_token = acquireSessionRes.data.data.userToken;
        const encryption_key = acquireSessionRes.data.data.encryptionKey;

        const idempotencyKey = uuidv4();
        const initializeUserOption = {
            method: "POST",
            url: "https://api.circle.com/v1/w3s/user/initialize",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
                "X-User-Token": user_token,
            },
            data: {
                idempotencyKey: idempotencyKey,
                accountType: "SCA",
                blockchains: ["MATIC-AMOY"],
            },
        };

        const initializeUserRes = await axios.request(initializeUserOption);
        const challenge_id = initializeUserRes.data.data.challengeId;

        res.status(201).json({
            app_id: process.env.CIRCLE_APP_ID,
            user_token: user_token,
            encryption_key: encryption_key,
            challenge_id: challenge_id,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                "Axios error:",
                error.response?.data || error.message,
            );
            res.status(error.response?.status || 500).json({
                message: error.response?.data || error.message,
            });
        } else {
            console.error("Unexpected error:", error);
            res.status(500).json({
                message: "An unexpected error occurred",
            });
        }
    }
};

module.exports.GetUserWallet = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const options = {
            method: "GET",
            url: `https://api.circle.com/v1/w3s/wallets?userId=${req.user._id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
            },
        };
        const response = await axios.request(options);

        console.log(response.data.data.wallets[0]);

        res.status(200).json({ wallet: response.data.data.wallets[0] });
    } catch (error) {
        console.error(error);
    }
};

// module.exports.AcquireSessionToken = async (req: Request, res: Response) => {
//     const options = {
//         method: "POST",
//         url: "https://api.circle.com/v1/w3s/users/token",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
//         },
//         data: { userId: req.user._id },
//     };
//     try {
//         const response = await axios.request(options);
//         console.log("user token:", response.data.data.userToken);
//         console.log("encription key:", response.data.data.encryptionKey);
//         const user = await UserModel.findById(req.user._id);
//         if (user) {
//             user.user_token = response.data.data.userToken;
//             user.encryption_key = response.data.data.encryptionKey;

//             await user.save();
//         }
//     } catch (error) {
//         res.status(400).json({
//             message: error,
//         });
//     }
// };

// module.exports.InitializeUser = async (req: Request, res: Response) => {
//     const idempotencyKey = uuidv4(); // generates an idempotency key
//     try {
//         const user = await UserModel.findById(req.user._id);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         const options = {
//             method: "POST",
//             url: "https://api.circle.com/v1/w3s/user/initialize",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
//                 "X-User-Token": user.user_token,
//             },
//             data: {
//                 idempotencyKey: idempotencyKey,
//                 accountType: "SCA",
//                 blockchains: ["MATIC-AMOY"],
//             },
//         };

//         console.log("Request Options:", options);

//         const response = await axios.request(options);
//         console.log("Response Data:", response.data);

//         user.challange_id = response.data.data.challengeId;
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: "Challenge ID created!",
//             data: response.data.data.challengeId,
//         });
//     } catch (error: any) {
//         console.error(
//             "Error:",
//             error.response ? error.response.data : error.message,
//         );
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while initializing the user.",
//         });
//     }
// };
