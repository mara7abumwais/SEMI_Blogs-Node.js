import { Schema ,model} from "mongoose";
import Joi from 'joi';

export const commentSchema = new Schema({
    content: {
        type: String,
        maxlength:[1024, 'Content must be at least 1024 characters long.'],
        trim:true,
        required: [true, 'Content is required'],
    },  
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'User Id is required'],
    },
    blogId:{
        type: Schema.Types.ObjectId, 
        ref: 'Blog',
        required: [true, 'Blog is required'],
    }
});

export const Comment = model('Comment',commentSchema);

export const ValidateComment = (comment) => {
    const schema = Joi.object({
        content: Joi.string().max(1024).required().messages({
            'string.base': 'Content must be a string.',
            'string.empty': 'Content cannot be empty.',
            'string.max': 'Content cannot exceed {#limit} characters.',
            'any.required': 'Content is required.',
        })
    }).unknown();
    return schema.validate(comment, { abortEarly: false });
};