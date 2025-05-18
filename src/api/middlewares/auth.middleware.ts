import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../modules/auth/services/auth.service';
import { AppError } from '../../shared/utils/app-error';

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No autorizado. Se requiere token de autenticación', 401);
    }
    
    // Extraer el token
    const token = authHeader.split(' ')[1];
    
    // Verificar token
    const authService = new AuthService();
    const decoded = authService.verifyToken(token);
    
    // Adjuntar usuario a la solicitud
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('No autorizado', 401));
    }
  }
};