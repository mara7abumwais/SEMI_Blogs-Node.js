import {Router} from 'express';
import { asyncMiddleware } from '../middlewares/async.js';
import {confirmEmail, login, resetPassword, sendCode, signUp} from '../controllers/auth.controller.js';
import {validate} from '../middlewares/validate.js';
import { validateUser } from '../models/user.model.js';
import {validateLogin,validatePassword} from '../controllers/auth.controller.js';
const router = Router();

router.get('/login',validate(validateLogin),asyncMiddleware(login));
router.post('/signUp',validate(validateUser),asyncMiddleware(signUp));
router.get('/confirmEmail/:token',asyncMiddleware(confirmEmail));
router.get('/sendCode',asyncMiddleware(sendCode));
router.get('/resetPassword',validate(validatePassword),asyncMiddleware(resetPassword));

export default router;