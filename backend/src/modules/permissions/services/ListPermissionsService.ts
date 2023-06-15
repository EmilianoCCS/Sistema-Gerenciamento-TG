import { injectable, inject } from "tsyringe";

// repositories
import { IPermissionsRepository } from "@modules/permissions/repositories/IPermissionsRepository";

// entities
import { PermissionEntity } from "@modules/permissions/infra/typeorm/entities/PermissionEntity";

interface IResponse {
  permissions: PermissionEntity[];
}

@injectable()
export class ListPermissionsService {
  constructor(
    // @ts-ignore
    @inject("PermissionsRepository")
    private readonly permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const permissions = await this.permissionsRepository.findAll();

    return { permissions };
  }
}
