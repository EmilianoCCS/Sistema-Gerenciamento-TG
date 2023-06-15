import { In, Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// repositories
import { IRolesPermissionsRepository } from "@modules/roles/repositories/IRolesPermissionsRepository";

// entities
import { RolePermissionEntity } from "@modules/roles/infra/typeorm/entities/RolePermissionEntity";

export class RolesPermissionsRepository implements IRolesPermissionsRepository {
  private repository: Repository<RolePermissionEntity>;

  constructor() {
    this.repository = dataSource.getRepository(RolePermissionEntity);
  }

  public async create(roleId: string, permissionIds: string[]): Promise<void> {
    const rolePermissions = permissionIds.map((permissionId) =>
      this.repository.create({
        roleId,
        permissionId,
      }),
    );

    await this.repository.save(rolePermissions);
  }

  public async deleteByPermissionIds(permissionIds: string[]): Promise<void> {
    await this.repository.delete({
      permissionId: In(permissionIds),
    });
  }
}
