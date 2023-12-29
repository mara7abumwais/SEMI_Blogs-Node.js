import { Schema, model } from "mongoose";
import Joi from 'joi';
import jwt from 'jsonwebtoken';

export const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long.'],
        maxlength: [50, 'Name cannot exceed 50 characters.'],
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        trim: true,
        maxlength: [255, 'Email cannot exceed 255 characters.'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format.'],
        //unique:true
        required: [true, 'Email is required.']
    },
    password: {
        type: String,
        minlength: [8, 'Password must be at least 8 characters long.'],
        maxlength: [255, 'Password cannot exceed 255 characters.'],
        required: [true, 'Password is required.']
    },
    bio: {
        type: String,
        trim: true,
        minlength: [20, 'Bio must be at least 20 characters long.'],
        maxlength: [255, 'Bio cannot exceed 255 characters.']
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
        default:'uploads/profile.png'
    },
    resetPasswordCode: {
        type: String,
        default:null
    },
    resetPasswordCodeExpires: {
        type: Date
    },
});

userSchema.methods.generateUserToken = function()
{
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.blogs_jwtPrivateKey,{ expiresIn: '8h' });
    return token;
};

export const User = model('User', userSchema);

export const validateUser = (user)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name cannot be empty.',
            'string.min': 'Name must have at least {#limit} characters.',
            'string.max': 'Name cannot exceed {#limit} characters.',
            'any.required': 'Name is required.',
        }),
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
        bio:Joi.string().min(20).max(255).messages({
            'string.base': 'Bio must be a string.',
            'string.min': 'Bio must have at least {#limit} characters.',
            'string.max': 'Bio cannot exceed {#limit} characters.',
            'any.required': 'Bio is required.',
        }),
        isAdmin:Joi.boolean()
    }).unknown();
    return schema.validate(user,{ abortEarly: false });
};

export const validateUserProfileUpdate = (user) => {
    const schema = Joi.object({
    name: Joi.string().min(3).max(50).messages({
        'string.base': 'Name must be a string.',
        'string.min': 'Name must have at least {#limit} characters.',
        'string.max': 'Name cannot exceed {#limit} characters.',
    }),
    email: Joi.string().max(255).email().messages({
        'string.base': 'Email must be a string.',
        'string.email': 'Invalid email format.',
        'string.max': 'Email cannot exceed {#limit} characters.',
    }),
    bio: Joi.string().min(20).max(255).messages({
        'string.base': 'Bio must be a string.',
        'string.min': 'Bio must have at least {#limit} characters.',
        'string.max': 'Bio cannot exceed {#limit} characters.',
    }),
    avatar:Joi.string().messages({
        'string.base': 'Bio must be a string.',
    }),
    }).unknown();
    return schema.validate(user, { abortEarly: false });
};