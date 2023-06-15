import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { PermissionEntity } from "@modules/permissions/infra/typeorm/entities/PermissionEntity";

@Entity({ name: "roles" })
export class RoleEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "name",
    type: "varchar",
  })
  name!: string;

  @Column({
    name: "description",
    type: "varchar",
  })
  description!: string;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "roles_permissions",
    joinColumns: [{ name: "role_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "permission_id", referencedColumnName: "id" }],
  })
  permissions!: PermissionEntity[];

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users!: UserEntity[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
