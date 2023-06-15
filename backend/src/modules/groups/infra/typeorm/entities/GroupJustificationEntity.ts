import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity({ name: "groups_justifications" })
export class GroupJustificationEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "group_id",
    type: "uuid",
  })
  groupId!: string;

  @Column({
    name: "justification_id",
    type: "uuid",
  })
  justificationId!: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
