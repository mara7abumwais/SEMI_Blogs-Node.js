import { Types } from "mongoose"
import CustomError from '../utils/customError.js'

export const validateObjectId = async(req,res,next)=>{
    try {
        if(!Types.ObjectId.isValid(req.params.id))
            throw new CustomError('Invalid ID.',404);
        next();
    } catch (err) {
        next(err); 
    }
}