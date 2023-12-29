import CustomError from "../utils/customError.js";

export const admin = (req,res,next)=>{
    if(!req.user.isAdmin)
        throw new CustomError('Access denied.',403);
    next();
}