export interface CreateRolDto {
    name: string;
    description: string;
}

export interface UpdateRolDto {
    name?: string;
    description?: string;
    active?: boolean;
} 

export interface RolResponseDto {
    id: number;
    name: string;
    description: string;
    active: boolean;
    createdAt: Date;
}