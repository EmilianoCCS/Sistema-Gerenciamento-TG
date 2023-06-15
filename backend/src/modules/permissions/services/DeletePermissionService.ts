import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// permissions
import { IPermissionsRepository } from "@modules/permissions/repositories/IPermissionsRepository";

interface IRequest {
  id: string;
}

@injectable()
export class DeletePermissionService {
  constructor(
    // @ts-ignore
    @inject("PermissionsRepository")
    private readonly permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const findPermission = await this.permissionsRepository.findById(id);

    if (!findPermission) {
      throw new AppError(MessagesHelper.PERMISSION_NOT_FOUND, 404);
    }

    await this.permissionsRepository.delete(findPermission.id);
  }
}
