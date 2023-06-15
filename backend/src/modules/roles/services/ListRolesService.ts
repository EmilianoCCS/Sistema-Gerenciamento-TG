import { injectable, inject } from "tsyringe";

// repositories
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";

// entities
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

interface IResponse {
  roles: RoleEntity[];
}

@injectable()
export class ListRolesService {
  constructor(
    // @ts-ignore
    @inject("RolesRepository")
    private readonly rolesRepository: IRolesRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const roles = await this.rolesRepository.findAll();

    return { roles };
  }
}
