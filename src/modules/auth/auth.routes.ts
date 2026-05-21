import { Router } from 'express';

import { login, logout, refresh, register } from './auth.controller';

import { loginSchema, registerSchema } from './auth.schema';

import { validate } from '../../middlewares/validate.middleware';
import { protect } from './auth.middleware';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', protect, refresh);
router.post('/logout', protect, logout);

export default router;
