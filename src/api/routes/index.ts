import { Router } from 'express';
import userRoutes from '../../modules/users/routes/routes';
import authRoutes from '../../modules/auth/routes/routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;