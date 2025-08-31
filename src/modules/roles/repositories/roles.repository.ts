import { AppDataSource } from "../../../core/database";
import { Rol } from "../entities/roles.entity";
import { CreateRolDto, UpdateRolDto } from "../dto/roles.dto";

export class RolRepository {
  private repository = AppDataSource.getRepository(Rol);

  async findAll(): Promise<Rol[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Rol | null> {
    return this.repository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Rol | null> {
    return this.repository.findOneBy({ name });
  }

  async create(rolData: CreateRolDto): Promise<Rol> {
    const newRol = this.repository.create(rolData);
    return this.repository.save(newRol);
  }

  async update(id: number, rolData: UpdateRolDto): Promise<Rol | null> {
    await this.repository.update(id, rolData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
