require("dotenv").config();
const jwt = require("jsonwebtoken");
import { IUser } from "../models/user.model";

/**
 * @desc GENERATE USER TOKEN
 */

export const generateUserToken = (user: IUser) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.TOKEN_KEY || "somethingsecret",
        {
            expiresIn: "1d", // 2 days
        },
    );
};
