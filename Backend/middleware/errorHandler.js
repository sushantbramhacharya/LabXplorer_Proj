import {PRODUCTION} from '../constants.js'
// When an error occurs in an Express.js application and is not caught within a route handler or middleware, Express will automatically delegate the error to the error-handling middleware defined in your application. This error-handling middleware typically comes after all other route handlers and middleware in your Express application.

export const errorHandler = (error, req, res, next) => {
    // Default to a 500 status code if none is set
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;

    // Check for specific PostgreSQL errors
    if (error.code) {
        // PostgreSQL error codes
        switch (error.code) {
            case '23505': // Unique violation
                message = 'Resource already exists';
                statusCode = 409; // Conflict
                break;
            case '23503': // Foreign key violation
                message = 'Resource not found';
                statusCode = 404; // Not Found
                break;
            case '42P01': // Undefined table
                message = 'Table not found';
                statusCode = 404; // Not Found
                break;
            default:
                // Handle other PostgreSQL error codes or unknown errors
                message = message || 'Database error';
                break;
        }
    }

    // Set response
    res.status(statusCode).json({
        message,
        stack: PRODUCTION === 'production' ? '---' : error.stack // Hide stack in production
    });
};
