import { Router } from 'express';
import { authorize, protect } from '../auth/auth.middleware';

const router = Router();

router.get('/me', protect, (_req, res) => {
  res.json({
    success: true,
    message: 'Protected route works',
  });
});

router.get('/admin', protect, authorize('admin'), (_req, res) => {
  res.json({
    success: true,
    message: 'Admin route works',
  });
});

export default router;
