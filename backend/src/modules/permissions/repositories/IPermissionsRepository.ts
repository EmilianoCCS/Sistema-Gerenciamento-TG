// dtos
import { ICreatePermissionDTO } from "@modules/permissions/dtos/ICreatePermissionDTO";

// Entities
import { PermissionEntity } from "@modules/permissions/infra/typeorm/entities/PermissionEntity";

export interface IPermissionsRepository {
  findAll(): Promise<PermissionEntity[]>;
  findByName(name: string): Promise<PermissionEntity | null>;
  findById(id: string): Promise<PermissionEntity | null>;
  findByIds(ids: string[]): Promise<PermissionEntity[]>;
  create(data: ICreatePermissionDTO): Promise<PermissionEntity>;
  update(permission: PermissionEntity): Promise<PermissionEntity>;
  delete(id: string): Promise<void>;
}
