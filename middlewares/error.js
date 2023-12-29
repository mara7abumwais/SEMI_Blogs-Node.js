import CustomError from "../utils/customError.js";

export const error = (err,req,res,next)=>{
    let statusCode = 500;
    let errors = [];
    if (err instanceof CustomError) {
        errors = err.message.split(',');
        statusCode = err.statusCode;
    }else if (err.name === 'ValidationError') {
        errors = Object.keys(err.errors).map((field) => (
            err.errors[field].message));
        statusCode = 400;
    }else if (err.name === 'MulterError')
    {
        errors.push('Multer error.');
    }
    else if (err.name === 'TokenExpiredError')
    {
        errors.push('Invalid token.');
    }else errors.push('Something went wrong!');
    return res.status(statusCode).json({ success: false, messages:errors });
};
