import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/utils/app-error';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
    return;
  }

  // Error no controlado
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor'
  });
};