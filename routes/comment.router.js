import {Router} from 'express';
import { asyncMiddleware } from '../middlewares/async.js';
import {validateObjectId} from '../middlewares/validateObjectId.js';
import {validate} from '../middlewares/validate.js';
import {auth} from '../middlewares/auth.js';
import { addComment, deleteComment, getAllComments, updateComment } from '../controllers/comment.controller.js';
import { ValidateComment } from '../models/comment.model.js';
const router = Router();

router.get('/:id',validateObjectId,asyncMiddleware(getAllComments));
router.post('/:id',[auth,validateObjectId,validate(ValidateComment)],asyncMiddleware(addComment));
router.patch('/:id',[auth,validateObjectId,validate(ValidateComment)],asyncMiddleware(updateComment));
router.delete('/:id',[auth,validateObjectId],asyncMiddleware(deleteComment));

export default router;