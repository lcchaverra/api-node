import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../../../shared/utils/app-error';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const authResponse = await this.authService.register(req.body);
        res.status(201).json({
            status: 'success',
            data: authResponse
        });
        } catch (error) {
        next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const authResponse = await this.authService.login(req.body);
        res.status(200).json({
            status: 'success',
            data: authResponse
        });
        } catch (error) {
        next(error);
        }
    };

    refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            throw new AppError('Refresh token es requerido', 400);
        }
        
        const tokens = await this.authService.refreshToken(refreshToken);
        res.status(200).json({
            status: 'success',
            data: tokens
        });
        } catch (error) {
        next(error);
        }
    };
}