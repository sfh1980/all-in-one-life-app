import Joi from 'joi';

// User registration validation
export const registerSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .max(255)
        .lowercase()
        .trim()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required',
            'string.max': 'Email must be less than 255 characters'
        }),

    password: Joi.string()
        .min(12)
        .max(128)
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/)
        .messages({
            'string.min': 'Password must be at least 12 characters long',
            'string.max': 'Password must be less than 128 characters',
            'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character',
            'any.required': 'Password is required'
        }),

    firstName: Joi.string()
        .min(1)
        .max(50)
        .optional()
        .trim()
        .pattern(/^[a-zA-Z\s'-]+$/)
        .messages({
            'string.pattern.base': 'First name can only contain letters, spaces, hyphens, and apostrophes',
            'string.max': 'First name must be less than 50 characters'
        }),

    lastName: Joi.string()
        .min(1)
        .max(50)
        .optional()
        .trim()
        .pattern(/^[a-zA-Z\s'-]+$/)
        .messages({
            'string.pattern.base': 'Last name can only contain letters, spaces, hyphens, and apostrophes',
            'string.max': 'Last name must be less than 50 characters'
        })
});

// User login validation
export const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .max(255)
        .lowercase()
        .trim()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .required()
        .max(128)
        .messages({
            'any.required': 'Password is required',
            'string.max': 'Invalid password format'
        })
});

// Password change validation
export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required()
        .max(128)
        .messages({
            'any.required': 'Current password is required'
        }),

    newPassword: Joi.string()
        .min(12)
        .max(128)
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/)
        .messages({
            'string.min': 'New password must be at least 12 characters long',
            'string.pattern.base': 'New password must contain uppercase, lowercase, number, and special character',
            'any.required': 'New password is required'
        })
});

// Refresh token validation
export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string()
        .required()
        .messages({
            'any.required': 'Refresh token is required'
        })
});