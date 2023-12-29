import { User } from "../models/user.model.js";
import { sendMail } from '../utils/sendEmail.js';
import CustomError from "../utils/customError.js";
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { nanoid } from "nanoid";
import bcrypt from 'bcryptjs';
import _ from 'lodash';

export const login = async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(!user) throw new CustomError("Invalid email or password", 400);
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) throw new CustomError("Invalid email or password", 400);
    
    if(!user.isVerified) throw new CustomError("Please verify your email.", 400);
    const token = await user.generateUserToken();
    res.header('x-auth-token',token).status(200).json({success:true,token});
};

export const signUp = async(req,res)=>{
    let  user = await User.findOne({email:req.body.email});
    if(user)
        throw new CustomError("User already registerd!",400);

    user = new User(_.pick(req.body,['name','email','password','isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();
    
    let token = jwt.sign({_id:user._id},process.env.ConfirmEmailToken,{expiresIn:'1h'});
    let message =`<a href="${req.protocol}://${req.headers.host}/api/auth/confirmEmail/${token}">Verify your email</a>`;
    await sendMail(user.email,message,"SEMI-Blogs Email Verification");

    res.status(200).json({success:true,user});
};

export const confirmEmail = async (req,res)=>{
    const {token} = req.params;
    let decoded = jwt.verify(token,process.env.ConfirmEmailToken);
    if(!decoded)
        throw new CustomError('Invalid token.',400);
    await User.findByIdAndUpdate({_id:decoded._id},{isVerified:true});
    res.status(200).json({success:true,message:'Email confirmed successfully.'});
}

export const sendCode = async(req,res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) throw new CustomError('Invalid Email.',404);

    user.resetPasswordCode = nanoid(); 
    user.resetPasswordCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const message = `<h1>Verification Code:</h1>
        <p>Scan the QR code below or click the link to reset your password:</p>
        <p>${user.resetPasswordCode}</p>
        <a href="${req.protocol}://${req.headers.host}/api/auth/resetPassword?code=${user.resetPasswordCode}">
        Reset Password</a>`;
    
    await sendMail(email,message,"SEMI-Blogs Reset Password");
    res.status(200).json({success:true,message:'The code was sent successfully.'});
};

export const resetPassword = async (req,res)=>{
    const {email,code,password} = req.body;
    const user = await User.findOne({email});
    if(!user ) throw new CustomError('Invalid email.',404);

    if(user.resetPasswordCodeExpires < Date.now() || code !== user.resetPasswordCode)
        throw new CustomError('Invalid  or expired code.',400);
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    await user.save();
    res.status(200).json({success:true,message:'Password reset successfully.'});
};

export const validateLogin =  (user)=>
{
    const schema = Joi.object({
        email: Joi.string().max(255).email().required().messages({
            'string.base': 'Email must be a string.',
            'string.empty': 'Email cannot be empty.',
            'string.email': 'Invalid email format.',
            'string.max': 'Email cannot exceed {#limit} characters.',
            'any.required': 'Email is required.',
        }),
        password: Joi.string().min(8).max(255).required().messages({
            'string.base': 'Password must be a string.',
            'string.empty': 'Password cannot be empty.',
            'string.min': 'Password must have at least {#limit} characters.',
            'string.max': 'Password cannot exceed {#limit} characters.',
            'any.required': 'Password is required.',
        }),
    }).unknown();
    return schema.validate(user);
};

export const validatePassword =  (password)=>
{
    const schema = Joi.object({
        password: Joi.string().min(8).max(255).required().messages({
            'string.base': 'Password must be a string.',
            'string.empty': 'Password cannot be empty.',
            'string.min': 'Password must have at least {#limit} characters.',
            'string.max': 'Password cannot exceed {#limit} characters.',
            'any.required': 'Password is required.',
        }),
    }).unknown();
    return schema.validate(password);
};