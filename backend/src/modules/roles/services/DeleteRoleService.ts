import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// permissions
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";

interface IRequest {
  id: string;
}

@injectable()
export class DeleteRoleService {
  constructor(
    // @ts-ignore
    @inject("RolesRepository")
    private readonly rolesRepository: IRolesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const findRole = await this.rolesRepository.findById(id);

    if (!findRole || !findRole.id) {
      throw new AppError(MessagesHelper.ROLE_NOT_FOUND, 404);
    }

    await this.rolesRepository.delete(findRole.id);
  }
}
