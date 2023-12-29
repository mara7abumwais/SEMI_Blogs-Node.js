import { Schema ,model} from "mongoose";
import { categorySchema } from "./category.model.js";
import Joi from 'joi';

export const blogSchema = new Schema({
    title: { 
        type: String,
        trim:true,
        minlength:[10, 'Title must be at least 10 characters long.'],
        maxlength:[255, 'Title must be at least 255 characters long.'],
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        minlength:[20, 'Content must be at least 20 characters long.'],
        maxlength:[1024, 'Content must be at least 1024 characters long.'],
        trim:true,
        required: [true, 'Content is required'],
    },
    publicationDate: {
        type: Date,
        default: Date.now()
    },    
    authorId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'Author Id is required'],
    },
    category:{
        type:categorySchema,
        required: [true, 'Category is required'],
    }
});

export const Blog = model('Blog',blogSchema);

export const ValidateBlog = (blog) => {
    const schema = Joi.object({
        title: Joi.string().min(10).max(255).required().messages({
            'string.base': 'Title must be a string.',
            'string.empty': 'Title cannot be empty.',
            'string.min': 'Title must have at least {#limit} characters.',
            'string.max': 'Title cannot exceed {#limit} characters.',
            'any.required': 'Title is required.',
        }),
        content: Joi.string().min(20).max(1024).required().messages({
            'string.base': 'Content must be a string.',
            'string.empty': 'Content cannot be empty.',
            'string.min': 'Content must have at least {#limit} characters.',
            'string.max': 'Content cannot exceed {#limit} characters.',
            'any.required': 'Content is required.',
        }),
        categoryId: Joi.objectId().required().messages({
            'any.required': 'Category ID is required.',
            'objectId': 'Category must be a valid ObjectId.',
        }),
    }).unknown();
    return schema.validate(blog, { abortEarly: false });
};