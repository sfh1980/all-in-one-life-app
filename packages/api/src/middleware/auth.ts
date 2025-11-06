import { Request, Response, NextFunction } from 'express';
import { JWTManager } from '../utils/jwt.ts';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
            };
        }
    }
}

/**
 * Middleware to authenticate JWT tokens
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            res.status(401).json({
                success: false,
                error: 'Access token required'
            });
            return;
        }

        // Verify the token
        const payload = JWTManager.verifyAccessToken(token);

        // Add user info to request object
        req.user = {
            userId: payload.userId,
            email: payload.email
        };

        next();
    } catch (error) {
        res.status(403).json({
            success: false,
            error: 'Invalid or expired token'
        });
        return;
    }
};

/**
 * Middleware to validate request input using Joi schemas
 */
export const validateInput = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, // Return all validation errors
            stripUnknown: true // Remove unknown fields
        });

        if (error) {
            const errorMessages = error.details.map((detail: any) => detail.message);
            res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errorMessages
            });
            return;
        }

        // Replace req.body with validated and sanitized data
        req.body = value;
        next();
    };
};