import {Router} from 'express';
import { asyncMiddleware } from '../middlewares/async.js';
import {validateObjectId} from '../middlewares/validateObjectId.js';
import {validate} from '../middlewares/validate.js';
import {auth} from '../middlewares/auth.js';
import { addBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from '../controllers/blog.controller.js';
import { ValidateBlog } from '../models/blog.model.js';
const router = Router();

router.get('/',asyncMiddleware(getAllBlogs));
router.get('/:id',validateObjectId,asyncMiddleware(getBlog));
router.post('/',[auth,validate(ValidateBlog)],asyncMiddleware(addBlog));
router.put('/:id',[auth,validateObjectId,validate(ValidateBlog)],asyncMiddleware(updateBlog));
router.delete('/:id',[auth,validateObjectId],asyncMiddleware(deleteBlog));

export default router;