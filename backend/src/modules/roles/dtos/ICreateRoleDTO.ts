// entities
import { PermissionEntity } from "@modules/permissions/infra/typeorm/entities/PermissionEntity";

export interface ICreateRoleDTO {
  name: string;
  description: string;
  permissions?: PermissionEntity[];
}
