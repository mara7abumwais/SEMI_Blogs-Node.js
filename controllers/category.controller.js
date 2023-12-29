import { Category } from "../models/category.model.js";
import CustomError from "../utils/customError.js";
import _ from 'lodash';

export const getAllCategories = async (req,res)=>{
    const catergories = await Category.find().select('-__v');
    res.status(200).json({success:true,catergories});
};

export const getCategory = async (req,res)=>{
    const {id} = req.params;
    const category = await Category.findById(id).select('-__v');
    if(!category) 
        throw new CustomError('Invalid ID.',404);
    res.status(200).json({success:true,category});
};

export const addCategory = async(req,res)=>{
    let category = new Category(_.pick(req.body,['name','description']));
    await category.save();
    res.status(200).json({success:true,category});
};

export const updateCategory = async(req,res)=>{
    const {id} = req.params;
    const category = await Category.findByIdAndUpdate({_id:id},
        _.pick(req.body,['name','description']),{new:true}).select('-__v');
    if(!category) 
        throw new CustomError('Invalid ID.',404);
    res.status(200).json({success:true,category});
};

export const deleteCategory = async(req,res)=>{
    const {id} = req.params;
    const category = await Category.findByIdAndDelete({_id:id});
    if(!category) 
        throw new CustomError('Invalid ID.',404);
    res.status(200).json({success:true,id});
};