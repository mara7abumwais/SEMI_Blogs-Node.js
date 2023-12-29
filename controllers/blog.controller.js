import { Blog } from "../models/blog.model.js";
import { Category } from "../models/category.model.js";
import CustomError from "../utils/customError.js";
import { pagination } from "../utils/pagination.js";

export const getAllBlogs = async(req,res)=>{
    let {page,size} = req.query;
    let {limit,skip} = pagination(page,size);

    const blogs = await Blog.find().select('-__v').limit(limit).skip(skip);
    res.status(200).json({success:true,blogs});
};

export const getBlog = async(req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id).select('-__v');
    if(!blog)
        throw new CustomError('Invalid ID.',404);
    res.status(200).json({success:true,blog});
};

export const addBlog = async(req,res)=>{
    const category = await Category.findById(req.body.categoryId);
    if(!category) throw new CustomError('Invalid Category.',404);

    const blog = new Blog({
        title:req.body.title,
        content:req.body.content,
        authorId:req.user._id,
        category:{
            _id:category._id,
            name:category.name,
        },
    });
    await blog.save();
    res.status(200).json({success:true,blog});
};

export const updateBlog = async(req,res)=>{
    const {id} = req.params;

    const category = await Category.findById(req.body.categoryId);
    if(!category) throw new CustomError('Invalid Category.',404);

    let blog = await Blog.findByIdAndUpdate({_id:id},{
        title:req.body.title,
        content:req.body.content,
        author:req.user._id,
        category:{
            _id:category._id,
            name:category.name,
        },
    },{new:true}).select('-__v');
    if(!blog)
        throw new CustomError('Invalid ID.',404);
    res.status(200).json({success:true,blog});
};

export const deleteBlog = async(req,res)=>{
    const {id} = req.params;
    let blog = await Blog.findByIdAndDelete({_id:id});
    if(!blog)
        throw new CustomError('Invalid ID.',404);
    res.status(200).json({success:true,id});
};