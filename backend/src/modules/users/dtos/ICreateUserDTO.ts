// dtos
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

export interface ICreateUserDTO {
  fullName?: string;
  displayName?: string;
  email: string;
  password: string;
  avatarUrl?: string;
  roles?: RoleEntity[];
}
