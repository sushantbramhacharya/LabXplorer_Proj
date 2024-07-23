// Define a function called asyncHandler that takes a function fn as an argument
const asyncHandler = function(fn) {
    // Return a new function that takes three parameters: req, res, and next
    return function(req, res, next) {
        // Wrap the execution of fn(req, res, next) in a promise
        // and resolve it immediately
        Promise.resolve(fn(req, res, next))
            // If any errors occur during the execution of fn,
            // catch them and pass them to the next middleware
            .catch(next);
    };
};

/*Func like this is not need to be implemented rathed should be wrapped in async handler
export const fetchMeds = async (req, res, next) => {
    try {
        const meds = await Med.find({});
        throw new Error("User Already Exists");
        res.status(200).json(meds);
    } catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
};
In non-async methods or synchronous route handlers, if you encounter an error and you don't explicitly pass it to the next() function, Express will not automatically handle the error for you. Instead, the error would typically bubble up to the global error handler or cause the application to crash if it's not caught anywhere.
*/

export default asyncHandler;