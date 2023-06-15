import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { v4 as uuidV4 } from "uuid";

// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";

@Entity({ name: "justifications" })
export class JustificationEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "text",
    type: "varchar",
  })
  text!: string;

  @ManyToMany(() => GroupEntity, (group) => group.justifications)
  groups?: GroupEntity[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
