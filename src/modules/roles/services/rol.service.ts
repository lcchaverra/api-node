import { RolRepository } from "../repositories/roles.repository";
import { CreateRolDto, UpdateRolDto, RolResponseDto } from "../dto/roles.dto";
import { AppError } from "../../../shared/utils/app-error";

export class RolService {
    private rolRepository: RolRepository;

    constructor(){
        this.rolRepository = new RolRepository();
    }

    async getAllRoles(): Promise<RolResponseDto[]> {
        const roles = await this.rolRepository.findAll();
        return roles.map(role => this.mapToResponseDto(role));
    }

    private mapToResponseDto(role: any): RolResponseDto {
        return {
            id: role.id,
            name: role.name,
            description: role.description,
            active: role.active,
            createdAt: role.createdAt
        };
    }

    async getRoleById(id: number): Promise<RolResponseDto> {
        const role = await this.rolRepository.findById(id);
        if (!role) {
            throw new AppError('Rol no encontrado', 404);
        }
        return this.mapToResponseDto(role);
    }

    async createRole(rolData: CreateRolDto): Promise<RolResponseDto> {
        const existingRole = await this.rolRepository.findByName(rolData.name);
        if (existingRole) {
            throw new AppError('El nombre del rol ya está registrado', 400);
        }
        const role = await this.rolRepository.create(rolData);
        return this.mapToResponseDto(role);
    }

    async updateRole(id: number, rolData: UpdateRolDto): Promise<RolResponseDto> {
        const existingRole = await this.rolRepository.findById(id);
        if (!existingRole) {
            throw new AppError('Rol no encontrado', 404);
        }
        const role = await this.rolRepository.update(id, rolData);
        return this.mapToResponseDto(role);
    }

    async deleteRole(id: number): Promise<void> {
        const role = await this.rolRepository.findById(id);
        if (!role) {
            throw new AppError('Rol no encontrado', 404);
        }
        await this.rolRepository.delete(id);
    }
}