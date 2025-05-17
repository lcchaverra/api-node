export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
}

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  active: boolean;
  createdAt: Date;
}