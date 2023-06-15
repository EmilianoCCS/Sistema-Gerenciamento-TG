import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity({ name: "users_roles" })
export class UserRoleEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "user_id",
    type: "uuid",
  })
  roleId!: string;

  @Column({
    name: "role_id",
    type: "uuid",
  })
  permissionId!: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
