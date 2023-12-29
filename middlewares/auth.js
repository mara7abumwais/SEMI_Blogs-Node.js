import { User } from "../models/user.model.js";
import CustomError from "../utils/customError.js";
import jwt from 'jsonwebtoken';

export const auth = async(req,res,next)=>{
    try{
        const token = req.header('x-auth-token');
        if(!token)
            throw new CustomError('Access denied. No token provided.',401);
        const decoded = jwt.verify(token,process.env.blogs_jwtPrivateKey);
        const user = await User.findById(decoded._id);
        if(!user) throw new CustomError('Invalid token.',401);
        req.user = decoded;
        next();
    }catch(err)
    {
        next(err);
    }
};