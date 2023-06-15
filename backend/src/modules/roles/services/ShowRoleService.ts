import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";

// entities
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

interface IRequest {
  id: string;
}

interface IResponsse {
  role: RoleEntity;
}

@injectable()
export class ShowRoleService {
  constructor(
    // @ts-ignore
    @inject("RolesRepository")
    private readonly rolesRepository: IRolesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponsse> {
    const findRole = await this.rolesRepository.findById(id);

    if (!findRole) {
      throw new AppError(MessagesHelper.ROLE_NOT_FOUND, 404);
    }

    return {
      role: findRole,
    };
  }
}
