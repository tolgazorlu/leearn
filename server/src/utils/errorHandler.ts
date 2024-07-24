import { Request, Response, NextFunction } from "express";

// Custom error class
export class AppError extends Error {
    public status: string; // fail or error
    public isOperational: boolean; // true or false

    constructor(
        public message: string, // error message
        public statusCode: number, // status code
    ) {
        super(message); // call the parent class constructor
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // fail or error
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Global error handler
export const globalErrorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
