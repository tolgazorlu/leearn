import { Response } from "express";
import { AppError } from "./errorHandler";

// Send error response
export const sendErrorResponse = (
    res: Response,
    statusCode: number,
    message: string,
) => {
    const error = new AppError(message, statusCode);
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    });
};
