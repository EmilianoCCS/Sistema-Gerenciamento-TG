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
  name: string;
  description: string;
}

interface IResponse {
  permission: PermissionEntity;
}

@injectable()
export class CreatePermissionService {
  constructor(
    // @ts-ignore
    @inject("PermissionsRepository")
    private readonly permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<IResponse> {
    const permissionAlreadyExists = await this.permissionsRepository.findByName(
      name,
    );

    if (permissionAlreadyExists) {
      throw new AppError(MessagesHelper.PERMISSION_ALREADY_EXISTS, 409);
    }

    const permission = await this.permissionsRepository.create({
      name,
      description,
    });

    return { permission };
  }
}
