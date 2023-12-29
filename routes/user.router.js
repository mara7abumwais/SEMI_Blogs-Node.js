import {Router} from 'express';
import { asyncMiddleware } from '../middlewares/async.js';
import { deleteUser, getAllUsers, getUser, updateAvatar, updateUser } from '../controllers/user.controller.js';
import {validateObjectId} from '../middlewares/validateObjectId.js';
import {validate} from '../middlewares/validate.js';
import {auth} from '../middlewares/auth.js';
import {validateUserProfileUpdate} from '../models/user.model.js';
import {Multer } from '../middlewares/multer.js';
const router = Router();

router.get('/',asyncMiddleware(getAllUsers));
router.get('/:id',validateObjectId,asyncMiddleware(getUser));
router.put('/:id',[auth,validateObjectId,validate(validateUserProfileUpdate)],asyncMiddleware(updateUser));
router.patch('/:id',[auth,validateObjectId,Multer().single('file')],asyncMiddleware(updateAvatar));
router.delete('/:id',[auth,validateObjectId],asyncMiddleware(deleteUser));

export default router;