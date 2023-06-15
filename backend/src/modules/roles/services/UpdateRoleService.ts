import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";
import { IRolesPermissionsRepository } from "@modules/roles/repositories/IRolesPermissionsRepository";
import { IPermissionsRepository } from "@modules/permissions/repositories/IPermissionsRepository";

// entities
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";
import { PermissionEntity } from "@modules/permissions/infra/typeorm/entities/PermissionEntity";

interface IRequest {
  id: string;
  name?: string;
  description?: string;
  permissionIds?: string[];
}

interface IResponse {
  role: RoleEntity;
}

@injectable()
export class UpdateRoleService {
  constructor(
    // @ts-ignore
    @inject("RolesRepository")
    private readonly rolesRepository: IRolesRepository,

    // @ts-ignore
    @inject("PermissionsRepository")
    private permissionsRepository: IPermissionsRepository,

    // @ts-ignore
    @inject("RolesPermissionsRepository")
    private rolesPermissionsRepository: IRolesPermissionsRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    permissionIds,
  }: IRequest): Promise<IResponse> {
    const findRole = await this.rolesRepository.findById(id);

    if (!findRole) {
      throw new AppError(MessagesHelper.ROLE_NOT_FOUND, 404);
    }

    if (name) {
      findRole.name = name;
    }

    if (description) {
      findRole.description = description;
    }

    const rolePermissionIds = findRole.permissions.map(
      (permission) => permission.id,
    );

    await this.rolesPermissionsRepository.deleteByPermissionIds(
      rolePermissionIds,
    );

    let permissions: PermissionEntity[] = [];

    if (permissionIds && permissionIds.length > 0) {
      permissions = await this.permissionsRepository.findByIds(permissionIds);
    }

    findRole.permissions = permissions;

    const updatedRole = await this.rolesRepository.update(findRole);

    return {
      role: updatedRole,
    };
  }
}
