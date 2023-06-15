import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

// entities
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

@Entity({ name: "permissions" })
export class PermissionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

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

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles!: RoleEntity[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
