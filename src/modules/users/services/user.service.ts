import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { AppError } from '../../../shared/utils/app-error';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private mapToResponseDto(user: any): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      createdAt: user.createdAt
    };
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => this.mapToResponseDto(user));
  }

  async getUserById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return this.mapToResponseDto(user);
  }

  async createUser(userData: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError('El correo electrónico ya está registrado', 400);
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    return this.mapToResponseDto(user);
  }


  async findByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      active: user.active
    };
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // Si se actualiza el email, verificar que no exista
    if (userData.email && userData.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new AppError('El correo electrónico ya está registrado', 400);
      }
    }

    // Si se actualiza la contraseña, hashearla
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const updatedUser = await this.userRepository.update(id, userData);
    return this.mapToResponseDto(updatedUser!);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new AppError('No se pudo eliminar el usuario', 500);
    }
  }
}