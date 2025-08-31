import { Request, Response, NextFunction } from 'express';
import { RolService } from '../services/rol.service';
import { AppError } from '../../../shared/utils/app-error';

export class RolController {
    private rolService: RolService;

    constructor() {
        this.rolService = new RolService();
    }

    getAllRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const roles = await this.rolService.getAllRoles();
            res.status(200).json({
                status: 'success',
                data: roles
            });
        } catch (error) {
            next(error);
        }
    };

    getRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new AppError('ID de rol inválido', 400);
            }

            const role = await this.rolService.getRoleById(id);
            res.status(200).json({
                status: 'success',
                data: role
            });
        } catch (error) {
            next(error);
        }
    };

    createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const role = await this.rolService.createRole(req.body);
            res.status(201).json({
                status: 'success',
                data: role
            });
        } catch (error) {
            next(error);
        }
    };

    updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new AppError('ID de rol inválido', 400);
            }

            const role = await this.rolService.updateRole(id, req.body);
            res.status(200).json({
                status: 'success',
                data: role
            });
        } catch (error) {
            next(error);
        }
    };

    deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new AppError('ID de rol inválido', 400);
            }

            await this.rolService.deleteRole(id);
            res.status(200).send({
                status: 'success',
                data: null,
                message: 'Rol eliminado correctamente'
            });
        } catch (error) {
            next(error);
        }
    };
}