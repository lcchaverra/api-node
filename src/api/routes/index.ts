import { Router } from 'express';
import userRoutes from '../../modules/users/routes/routes';
// Importar otras rutas según sea necesario

const router = Router();

router.use('/users', userRoutes);
// Configurar otras rutas principales aquí

export default router;