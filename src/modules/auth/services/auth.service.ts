// src/modules/auth/services/auth.service.ts
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UserService } from '../../users/services/user.service';
import { RegisterDto, LoginDto, AuthResponseDto } from '../dto/auth.dto';
import { UserResponseDto } from '../../users/dto/user.dto';
import { AppError } from '../../../shared/utils/app-error';
import { access } from 'fs';

export class AuthService {
    private userService: UserService;
    private jwtSecret: string;
    private jwtRefreshSecret: string;
    private tokenExpiration: string;
    private refreshTokenExpiration: string;

    constructor() {
        this.userService = new UserService();
        this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
        this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
        this.tokenExpiration = process.env.JWT_EXPIRATION || '1h';
        this.refreshTokenExpiration = process.env.JWT_REFRESH_EXPIRATION || '7d';
    }

    async register(userData: RegisterDto): Promise<AuthResponseDto> {
        try {
        // Crear usuario nuevo
        const newUser = await this.userService.createUser(userData);
        
        // Generar tokens
        const tokens = this.generateTokens(newUser.id, newUser.email);
        
        return {
            user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
            },
            ...tokens
        };
        } catch (error) {
        if (error instanceof AppError) {
            // console.error('Error al registrar usuario:', error.message);
            throw error;
        }
        throw new AppError('Error al registrar usuario:' + error, 500);
        }
    }

    async login(credentials: LoginDto): Promise<AuthResponseDto> {
        try {
        // Buscar usuario por email
        const user = await this.userService.findByEmail(credentials.email);
        
        if (!user) {
            throw new AppError('Credenciales inválidas', 401);
        }
        
        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordValid) {
            throw new AppError('Credenciales inválidas', 401);
        }
        
        // Generar tokens
        const tokens = this.generateTokens(user.id, user.email);
        
        return {
            user: {
            id: user.id,
            name: user.name,
            email: user.email
            },
            ...tokens
        };
        } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError('Error al iniciar sesión', 500);
        }
    }

    async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
        try {
        // Verificar refresh token
        const decoded = jwt.verify(refreshToken, this.jwtRefreshSecret) as { id: number; email: string };
        
        // Buscar usuario por id
        const user = await this.userService.getUserById(decoded.id);
        
        // Generar nuevos tokens
        return this.generateTokens(user.id, user.email);
        } catch (error) {
        throw new AppError('Token inválido o expirado', 401);
        }
    }

    private generateTokens(userId: number, email: string): { token: string; refreshToken: string } {
        const payload = { id: userId, email };

        const accessTokenOptions: SignOptions = {
            expiresIn: this.tokenExpiration as SignOptions['expiresIn']
        };

        const refreshTokenOptions: SignOptions = {
            expiresIn: this.refreshTokenExpiration as SignOptions['expiresIn']
        };
        
        const token = jwt.sign( payload, this.jwtSecret, accessTokenOptions);
        const refreshToken = jwt.sign( payload, this.jwtRefreshSecret, refreshTokenOptions );
        
        return { token, refreshToken };
    }

    verifyToken(token: string): { id: number; email: string } {
        try {
        return jwt.verify(token, this.jwtSecret) as { id: number; email: string };
        } catch (error) {
        throw new AppError('Token inválido o expirado', 401);
        }
    }
}