// NEED PROVIDE ALL USER TYPES FOR TYPESCRIPT.

declare namespace Express {
    export interface Request {
        user: {
            firstname: string;
            lastname: string;
            avatar: string;
            email: string;
            role: string;
        };
        file?: any;
    }
}
