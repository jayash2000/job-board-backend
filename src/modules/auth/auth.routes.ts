import { Router } from 'express';

import { login, logout, refresh, register } from './auth.controller';

import { loginSchema, registerSchema } from './auth.schema';

import { validate } from '../../middlewares/validate.middleware';

const router = Router();

router.route('/register').post(validate(registerSchema), register);
router.route('/login').post(validate(loginSchema), login);
router.route('/refresh').post(refresh);
router.route('/logout').post(logout);

export default router;
