import { In, Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateRoleDTO } from "@modules/roles/dtos/ICreateRoleDTO";

// repositories
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";

// entities
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

export class RolesRepository implements IRolesRepository {
  private repository: Repository<RoleEntity>;

  constructor() {
    this.repository = dataSource.getRepository(RoleEntity);
  }

  public async findAll(): Promise<RoleEntity[]> {
    const roles = await this.repository.find({
      relations: ["permissions"],
    });

    return roles;
  }

  public async findByName(name: string): Promise<RoleEntity | null> {
    const role = await this.repository.findOne({
      where: { name },
      relations: ["permissions"],
    });

    return role;
  }

  public async findById(id: string): Promise<RoleEntity | null> {
    const role = await this.repository.findOne({
      where: { id },
      relations: ["permissions"],
    });

    return role;
  }

  public async findByIds(ids: string[]): Promise<RoleEntity[]> {
    const roles = await this.repository.find({
      where: {
        id: In(ids),
      },
    });

    return roles;
  }

  public async create(data: ICreateRoleDTO): Promise<RoleEntity> {
    const role = this.repository.create(data);

    await this.repository.save(role);

    return role;
  }

  public async update(role: RoleEntity): Promise<RoleEntity> {
    return this.repository.save(role);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
