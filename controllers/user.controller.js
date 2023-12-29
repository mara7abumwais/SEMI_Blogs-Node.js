import {User} from '../models/user.model.js';
import CustomError from '../utils/customError.js';
import { pagination } from '../utils/pagination.js';
import cloudinary from '../utils/cloudinary.js';
import _ from 'lodash';

export const getAllUsers = async(req,res)=>{
    let {page,size} = req.query;
    let {limit,skip} = pagination(page,size);

    const users = await User.find().select('-password -__v').limit(limit).skip(skip);
    res.status(200).json({success:true,users});
};

export const getUser = async(req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id).select('-password -__v');
    if(!user)
        throw new CustomError('Invalid ID.',404);
    res.status(200).json({success:true,user});
};

export const updateUser = async(req,res)=>{
    let  user = await User.findByIdAndUpdate({_id:req.user._id},
        _.pick(req.body,['name','email','bio']),{new:true}).select('-password -__v');
    res.status(201).json({success:true,user});
};

export const deleteUser = async(req,res)=>{
    const {_id} = await User.findByIdAndDelete({_id:req.user._id});
    res.status(201).json({success:true,_id});
};

export const updateAvatar = async(req,res)=>{
    if(!req.file) throw new CustomError('Please upload a picture.',400);
    let user = await User.findById(req.user._id);
    const previousAvatarUrl = user.avatar;

    if (previousAvatarUrl) {
        const publicId = previousAvatarUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
    }

    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: `Blogs-App/user/${req.user._id}`
    });
    user = await User.findByIdAndUpdate({_id:req.user._id},{avatar:secure_url},{new:true}).select('-password -__v');
    res.status(201).json({success:true,user});
};


