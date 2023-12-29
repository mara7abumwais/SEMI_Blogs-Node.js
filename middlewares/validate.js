import CustomError from "../utils/customError.js";

export const validate = (validator)=>{
    return (req,res,next)=>
    {
        const {error} = validator(req.body);
        if (error) {
            const validationErrors = [];
            error.details.map((detail) => validationErrors.push(detail.message));
            throw new CustomError(validationErrors, 400);
        }
        next();
    };
};