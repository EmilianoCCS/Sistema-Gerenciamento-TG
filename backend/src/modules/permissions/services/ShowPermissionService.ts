import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IPermissionsRepository } from "@modules/permissions/repositories/IPermissionsRepository";

// entities
import { PermissionEntity } from "@modules/permissions/infra/typeorm/entities/PermissionEntity";

interface IRequest {
  id: string;
}

interface IResponsse {
  permission: PermissionEntity;
}

@injectable()
export class ShowPermissionService {
  constructor(
    // @ts-ignore
    @inject("PermissionsRepository")
    private readonly permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponsse> {
    const findPermission = await this.permissionsRepository.findById(id);

    if (!findPermission) {
      throw new AppError(MessagesHelper.PERMISSION_NOT_FOUND, 404);
    }

    return {
      permission: findPermission,
    };
  }
}
