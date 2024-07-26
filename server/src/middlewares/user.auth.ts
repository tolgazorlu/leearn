/**
 * @desc Check if the user is authenticated.
 */

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const Auth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer xxxxx

        try {
            const decode = jwt.verify(
                token,
                process.env.TOKEN_KEY || "somethingsecret",
            );

            req.user = decode as {
                _id: string;
                firstname: string;
                lastname: string;
                avatar: string;
                email: string;
                role: string;
            };

            next(); // 200 OK
        } catch (error) {
            console.error("Token verification error:", error);
            res.status(401).json({ message: "Token is Invalid!" }); // 401 Unauthorized
        }
    } else {
        res.status(401).json({ message: "Token not found!" }); // 401 Unauthorized
    }
};
