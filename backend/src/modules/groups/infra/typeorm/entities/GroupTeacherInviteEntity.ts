import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";

@Entity({ name: "group_teacher_invites" })
export class GroupTeacherInviteEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "group_id",
    type: "uuid",
  })
  groupId!: string;

  @ManyToOne(() => GroupEntity)
  @JoinColumn({ name: "group_id" })
  group!: GroupEntity;

  @Column({
    name: "teacher_id",
    type: "uuid",
  })
  teacherId!: string;

  @ManyToOne(() => TeacherEntity)
  @JoinColumn({ name: "teacher_id" })
  teacher!: TeacherEntity;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
