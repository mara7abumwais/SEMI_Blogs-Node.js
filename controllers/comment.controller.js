import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";
import CustomError from "../utils/customError.js";

export const getAllComments = async(req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog) throw new CustomError('Invalid ID.',400);

    const comments = await Comment.find({blogId:id});
    res.status(200).json({success:true,comments});
};

export const addComment = async (req,res)=>{
    const {id} = req.params;
    
    const blog = await Blog.findById(id);
    if(!blog) throw new CustomError('Invalid ID.',400);

    const comment = new Comment({
        content:req.body.content,
        userId:req.user._id,
        blogId:id
    });
    await comment.save();
    res.status(200).json({success:true,comment});
};

export const updateComment = async (req,res)=>{
    const {id} = req.params;

    const comment = await Comment.findById(id);
    console.log(comment.userId,req.user._id)
    if(!comment.userId.equals(req.user._id)) 
        throw new CustomError('Forbidden: This comment does not belong to you.',403);

    comment.content = req.body.content;
    await comment.save();
    res.status(200).json({success:true,comment});
};

export const deleteComment = async (req,res)=>{
    const {id} = req.params;

    const comment = await Comment.findById(id);
    console.log(comment.userId,req.user._id)
    if(!comment.userId.equals(req.user._id)) 
        throw new CustomError('Forbidden: This comment does not belong to you.',403);

    await Comment.findByIdAndDelete({_id:id});
    res.status(200).json({success:true,id});
};