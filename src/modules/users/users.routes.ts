import { Router } from 'express';
import { authorize, protect } from '../auth/auth.middleware';
import { getProfile, updateProfile } from './users.controller';

const router = Router();

router.route('/me').get(protect, getProfile).patch(protect, updateProfile);

export default router;
