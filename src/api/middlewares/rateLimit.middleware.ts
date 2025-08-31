import { rateLimit } from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import logger from '../../core/logger';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por ventana
  standardHeaders: true, // Incluye información del límite en los headers
  legacyHeaders: false, // Desactiva los headers de legacy
  message: {
    success: false,
    message: 'Demasiadas peticiones desde esta IP, por favor intente nuevamente en 15 minutos.'
  },
  handler: (req: Request, res: Response, next: NextFunction, options) => {
    logger.warn(`Se ha alcanzado el límite de peticiones para la IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  }
});

// Rate limit más estricto para rutas de autenticación
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Solo 10 intentos de login cada 15 minutos por IP
  message: {
    success: false,
    message: 'Demasiados intentos de inicio de sesión, por favor intente nuevamente en 15 minutos.'
  }
});

// Rate limit para rutas públicas
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 200, // 200 peticiones cada 15 minutos
  message: {
    success: false,
    message: 'Demasiadas peticiones, por favor intente nuevamente más tarde.'
  }
});
