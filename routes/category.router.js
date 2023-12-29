import {Router} from 'express';
import { asyncMiddleware } from '../middlewares/async.js';
import {validateObjectId} from '../middlewares/validateObjectId.js';
import {validate} from '../middlewares/validate.js';
import {auth} from '../middlewares/auth.js';
import {admin} from '../middlewares/admin.js';
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from '../controllers/category.controller.js';
import { ValidateCategory } from '../models/category.model.js';
const router = Router();

router.get('/',asyncMiddleware(getAllCategories));
router.get('/:id',validateObjectId,asyncMiddleware(getCategory));
router.post('/',[auth,admin,validate(ValidateCategory)],asyncMiddleware(addCategory));
router.put('/:id',[auth,admin,validateObjectId,validate(ValidateCategory)],asyncMiddleware(updateCategory));
router.delete('/:id',[auth,admin,validateObjectId],asyncMiddleware(deleteCategory));

export default router;