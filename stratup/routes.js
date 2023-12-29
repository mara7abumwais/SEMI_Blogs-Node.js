import express from 'express';
import cors from 'cors';
import homeRouter from '../routes/home.router.js';
import authRouter from '../routes/auth.router.js';
import userRouter from '../routes/user.router.js';
import blogRouter from '../routes/blog.router.js';
import categoryRouter from '../routes/category.router.js';
import commentRouter from '../routes/comment.router.js';
import {error} from '../middlewares/error.js';
import CustomError from '../utils/customError.js';

export const createApp = ()=>{
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use('/',homeRouter);
    app.use('/api/auth',authRouter);
    app.use('/api/users',userRouter);
    app.use('/api/blogs',blogRouter);
    app.use('/api/categories',categoryRouter);
    app.use('/api/comments',commentRouter);
    app.use('*',(req,res)=>{
        throw new CustomError('Page not found!',404);
    });
    app.use(error);
    return app;
};


