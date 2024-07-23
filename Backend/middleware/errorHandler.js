import {PRODUCTION} from '../constants.js'
// When an error occurs in an Express.js application and is not caught within a route handler or middleware, Express will automatically delegate the error to the error-handling middleware defined in your application. This error-handling middleware typically comes after all other route handlers and middleware in your Express application.
export const errorHandler=(error,req,res,next)=>{

    //if res is already sent it sends again with 500
    let statusCode=res.statusCode === 200?500:res.statusCode;
    let message=error.message;

    //Check for Mongoose cast error when wrong Oid is given
    if(error.name==='CastError' && error.kind === 'ObjectId')
    {
        message="Resoruce not found";
        statusCode=404;
    }

    res.status(statusCode).json({
        message,
        stack:PRODUCTION ? '---' : error.stack
    });
}