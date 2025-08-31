import { Router } from 'express';
import userRoutes from '../../modules/users/routes/routes';
import authRoutes from '../../modules/auth/routes/routes';
import roleRoutes from '../../modules/roles/routes/routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);

export default router;