export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  rol?: number;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  rol?: number;
}

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  active: boolean;
  rol: number;
  createdAt: Date;
}