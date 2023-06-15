import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";
import { IPermissionsRepository } from "@modules/permissions/repositories/IPermissionsRepository";

// entities
import { PermissionEntity } from "@modules/permissions/infra/typeorm/entities/PermissionEntity";
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

interface IRequest {
  name: string;
  description: string;
  permissionIds: string[];
}

interface IResponse {
  role: RoleEntity;
}

@injectable()
export class CreateRoleService {
  constructor(
    // @ts-ignore
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,

    // @ts-ignore
    @inject("PermissionsRepository")
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    name,
    description,
    permissionIds,
  }: IRequest): Promise<IResponse> {
    const roleAlreadyExists = await this.rolesRepository.findByName(name);

    if (roleAlreadyExists) {
      throw new AppError(MessagesHelper.ROLE_ALREADY_EXISTS, 409);
    }

    let permissions: PermissionEntity[] = [];

    if (permissionIds && permissionIds.length > 0) {
      permissions = await this.permissionsRepository.findByIds(permissionIds);
    }

    const role = await this.rolesRepository.create({
      name,
      description,
      permissions,
    });

    return { role };
  }
}
