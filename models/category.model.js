import { Schema ,model} from "mongoose";
import Joi from 'joi';

export const categorySchema = new Schema({
    name: { 
        type: String,
        trim:true,
        minlength:[5, 'Name must be at least 5 characters long.'],
        maxlength:[100, 'Name must be at least 100 characters long.'],
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        minlength:[20, 'Description must be at least 20 characters long.'],
        maxlength:[255, 'Description must be at least 255 characters long.'],
        trim:true,
    },
});

export const Category = model('Category',categorySchema);

export const ValidateCategory = (category)=>{
    const shcema = Joi.object({
        name:Joi.string().min(5).max(100).required().messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name cannot be empty.',
            'string.min': 'Name must have at least {#limit} characters.',
            'string.max': 'Name cannot exceed {#limit} characters.',
            'any.required': 'Name is required.',
        }),
        description:Joi.string().min(10).max(100).messages({
            'string.base': 'Description must be a string.',
            'string.min': 'Description must have at least {#limit} characters.',
            'string.max': 'Description cannot exceed {#limit} characters.',
        }),
    }).unknown();
    return shcema.validate(category,{ abortEarly: false });
};