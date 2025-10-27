import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PasswordSecurity } from '../utils/password.js';
import { JWTManager } from '../utils/jwt.js';
import { validateInput } from '../middleware/auth.js';
import { registerSchema, loginSchema, refreshTokenSchema } from '../schemas/auth.js';

const router = Router();
const prisma = new PrismaClient();

/**
 * POST /auth/register
 * Register a new user
 */
router.post('/register', validateInput(registerSchema), async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            res.status(409).json({
                success: false,
                error: 'User with this email already exists'
            });
            return;
        }

        // Hash password
        const hashedPassword = await PasswordSecurity.hashPassword(password);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName
            }
        });

        // Generate tokens
        const tokens = JWTManager.generateTokenPair(user.id, user.email);

        // Return success (don't include password hash)
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            tokens
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

/**
 * POST /auth/login
 * Login user and return tokens
 */
router.post('/login', validateInput(loginSchema), async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
            return;
        }

        // Verify password
        const isValidPassword = await PasswordSecurity.verifyPassword(password, user.password);

        if (!isValidPassword) {
            res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
            return;
        }

        // Generate tokens
        const tokens = JWTManager.generateTokenPair(user.id, user.email);

        // Return success
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            tokens
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

/**
 * POST /auth/refresh
 * Refresh access token using refresh token
 */
router.post('/refresh', validateInput(refreshTokenSchema), async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        // Verify refresh token
        const payload = JWTManager.verifyRefreshToken(refreshToken);

        // Verify user still exists
        const user = await prisma.user.findUnique({
            where: { id: payload.userId }
        });

        if (!user) {
            res.status(401).json({
                success: false,
                error: 'User not found'
            });
            return;
        }

        // Generate new token pair
        const tokens = JWTManager.generateTokenPair(user.id, user.email);

        res.status(200).json({
            success: true,
            message: 'Tokens refreshed successfully',
            tokens
        });

    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(401).json({
            success: false,
            error: 'Invalid or expired refresh token'
        });
    }
});

/**
 * POST /auth/logout
 * Logout user (client should discard tokens)
 */
router.post('/logout', async (req: Request, res: Response): Promise<void> => {
    // In a more advanced implementation, you would:
    // 1. Add refresh token to blacklist
    // 2. Store blacklisted tokens in Redis/database
    // For now, client-side token removal is sufficient

    res.status(200).json({
        success: true,
        message: 'Logout successful'
    });
});

export default router;