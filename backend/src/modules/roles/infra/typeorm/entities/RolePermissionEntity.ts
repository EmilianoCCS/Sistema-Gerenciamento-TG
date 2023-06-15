import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity({ name: "roles_permissions" })
export class RolePermissionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "role_id",
    type: "uuid",
  })
  roleId!: string;

  @Column({
    name: "permission_id",
    type: "uuid",
  })
  permissionId!: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
