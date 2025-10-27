import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: string;
    email: string;
    type: 'access' | 'refresh';
}

interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export class JWTManager {
    private static readonly ACCESS_TOKEN_EXPIRY = '15m';
    private static readonly REFRESH_TOKEN_EXPIRY = '7d';

    /**
     * Generate access and refresh token pair
     */
    static generateTokenPair(userId: string, email: string): TokenPair {
        const accessTokenPayload: TokenPayload = {
            userId,
            email,
            type: 'access'
        };

        const refreshTokenPayload: TokenPayload = {
            userId,
            email,
            type: 'refresh'
        };

        const accessToken = jwt.sign(
            accessTokenPayload,
            this.getJWTSecret(),
            { expiresIn: this.ACCESS_TOKEN_EXPIRY }
        );

        const refreshToken = jwt.sign(
            refreshTokenPayload,
            this.getRefreshSecret(),
            { expiresIn: this.REFRESH_TOKEN_EXPIRY }
        );

        return { accessToken, refreshToken };
    }

    /**
     * Verify access token
     */
    static verifyAccessToken(token: string): TokenPayload {
        try {
            const payload = jwt.verify(token, this.getJWTSecret()) as TokenPayload;

            if (payload.type !== 'access') {
                throw new Error('Invalid token type');
            }

            return payload;
        } catch (error) {
            throw new Error('Invalid or expired access token');
        }
    }

    /**
     * Verify refresh token
     */
    static verifyRefreshToken(token: string): TokenPayload {
        try {
            const payload = jwt.verify(token, this.getRefreshSecret()) as TokenPayload;

            if (payload.type !== 'refresh') {
                throw new Error('Invalid token type');
            }

            return payload;
        } catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }

    /**
     * Get JWT secret from environment
     */
    private static getJWTSecret(): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET environment variable is required');
        }
        return secret;
    }

    /**
     * Get refresh token secret from environment
     */
    private static getRefreshSecret(): string {
        const secret = process.env.JWT_REFRESH_SECRET;
        if (!secret) {
            throw new Error('JWT_REFRESH_SECRET environment variable is required');
        }
        return secret;
    }
}