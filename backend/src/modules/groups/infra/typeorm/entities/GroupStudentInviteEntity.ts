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
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";

@Entity({ name: "group_student_invites" })
export class GroupStudentInviteEntity {
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
    name: "student_id",
    type: "uuid",
  })
  studentId!: string;

  @ManyToOne(() => StudentEntity)
  @JoinColumn({ name: "student_id" })
  student!: StudentEntity;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
