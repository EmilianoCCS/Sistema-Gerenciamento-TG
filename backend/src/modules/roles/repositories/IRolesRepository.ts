// dtos
import { ICreateRoleDTO } from "@modules/roles/dtos/ICreateRoleDTO";

// entities
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

export interface IRolesRepository {
  findAll(): Promise<RoleEntity[]>;
  findByName(name: string): Promise<RoleEntity | null>;
  findById(id: string): Promise<RoleEntity | null>;
  findByIds(ids: string[]): Promise<RoleEntity[]>;
  create(data: ICreateRoleDTO): Promise<RoleEntity>;
  update(role: RoleEntity): Promise<RoleEntity>;
  delete(id: string): Promise<void>;
}
