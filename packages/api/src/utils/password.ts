import bcrypt from 'bcrypt';

export class PasswordSecurity {
    private static readonly SALT_ROUNDS = 12;
    private static readonly MIN_LENGTH = 12;

    /**
     * Hash a password securely using bcrypt
     */
    static async hashPassword(password: string): Promise<string> {
        // Validate password strength first
        this.validatePasswordStrength(password);

        // Generate salt and hash
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    /**
     * Verify a password against its hash
     */
    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    /**
     * Validate password meets security requirements
     */
    private static validatePasswordStrength(password: string): void {
        if (password.length < this.MIN_LENGTH) {
            throw new Error(`Password must be at least ${this.MIN_LENGTH} characters long`);
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUpperCase) {
            throw new Error('Password must contain at least one uppercase letter');
        }

        if (!hasLowerCase) {
            throw new Error('Password must contain at least one lowercase letter');
        }

        if (!hasNumbers) {
            throw new Error('Password must contain at least one number');
        }

        if (!hasSpecialChar) {
            throw new Error('Password must contain at least one special character');
        }

        // Check against common passwords
        if (this.isCommonPassword(password)) {
            throw new Error('Password is too common, please choose a stronger password');
        }
    }

    /**
     * Check if password is in common passwords list
     */
    private static isCommonPassword(password: string): boolean {
        const commonPasswords = [
            'password', '123456', 'password123', 'admin', 'qwerty',
            'letmein', 'welcome', 'monkey', '1234567890', 'abc123',
            'password1', '123456789', 'welcome123', 'admin123'
        ];

        return commonPasswords.includes(password.toLowerCase());
    }
}