export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
  refreshToken?: string;
}