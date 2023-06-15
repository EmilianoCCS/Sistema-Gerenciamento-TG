import { Repository, In } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreatePermissionDTO } from "@modules/permissions/dtos/ICreatePermissionDTO";

// repositories
import { IPermissionsRepository } from "@modules/permissions/repositories/IPermissionsRepository";

// entities
import { PermissionEntity } from "@modules/permissions/infra/typeorm/entities/PermissionEntity";

export class PermissionsRepository implements IPermissionsRepository {
  private repository: Repository<PermissionEntity>;

  constructor() {
    this.repository = dataSource.getRepository(PermissionEntity);
  }

  public async findAll(): Promise<PermissionEntity[]> {
    const permissions = await this.repository.find();

    return permissions;
  }

  public async findByName(name: string): Promise<PermissionEntity | null> {
    const permission = await this.repository.findOne({
      where: { name },
    });

    return permission;
  }

  public async findById(id: string): Promise<PermissionEntity | null> {
    const permission = await this.repository.findOne({
      where: { id },
    });

    return permission;
  }

  public async findByIds(ids: string[]): Promise<PermissionEntity[]> {
    const permissions = await this.repository.find({
      where: {
        id: In(ids),
      },
    });

    return permissions;
  }

  public async create(data: ICreatePermissionDTO): Promise<PermissionEntity> {
    const permission = this.repository.create(data);

    await this.repository.save(permission);

    return permission;
  }

  public async update(permission: PermissionEntity): Promise<PermissionEntity> {
    return this.repository.save(permission);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
