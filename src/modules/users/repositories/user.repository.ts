import { AppDataSource } from '../../../core/database';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.repository.create(userData);
    return this.repository.save(newUser);
  }

  async update(id: number, userData: UpdateUserDto): Promise<User | null> {
    await this.repository.update(id, userData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}