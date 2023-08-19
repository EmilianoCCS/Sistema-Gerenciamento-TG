import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { v4 as uuidV4 } from "uuid";

// config
import uploadConfig from "@config/upload";

// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";
import { GroupStudentInviteEntity } from "@modules/groups/infra/typeorm/entities/GroupStudentInviteEntity";
import { GroupTeacherInviteEntity } from "@modules/groups/infra/typeorm/entities/GroupTeacherInviteEntity";
import { JustificationEntity } from "./JustificationEntity";
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";
import { ScheduleEntity } from "@modules/schedules/infra/typeorm/entities/ScheduleEntity";

@Entity({ name: "groups" })
export class GroupEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "theme",
    type: "varchar",
  })
  theme!: string;

  @Column({
    name: "summary",
    type: "varchar",
  })
  summary!: string;

  @Column({
    name: "teacher_id",
    type: "uuid",
  })
  teacherId!: string;

  @ManyToOne(() => TeacherEntity)
  @JoinColumn({ name: "teacher_id" })
  teacher!: TeacherEntity;

  @OneToMany(
    () => GroupStudentInviteEntity,
    (groupStudentInvite) => groupStudentInvite.group,
  )
  @Expose({ name: "studentInvites" })
  groupStudentInvites?: GroupStudentInviteEntity[];

  @OneToMany(
    () => GroupTeacherInviteEntity,
    (groupTeacherInvite) => groupTeacherInvite.group,
  )
  @Expose({ name: "teacherInvites" })
  groupTeacherInvites?: GroupTeacherInviteEntity[];

  // @OneToOne(() => GroupStudentEntity, (groupStudent) => groupStudent.group)
  // @JoinTable({
  //   name: "groups_students",
  //   joinColumns: [{ name: "group_id", referencedColumnName: "id" }],
  //   inverseJoinColumns: [{ name: "student_id", referencedColumnName: "id" }],
  // })
  // groupStudent?: GroupStudentEntity;

  @ManyToMany(() => StudentEntity, (student) => student.groups)
  students?: StudentEntity[];

  // @OneToOne(() => GroupStudentEntity, (groupStudent) => groupStudent.group)
  // @JoinTable({
  //   name: "groups_teachers",
  //   joinColumns: [{ name: "group_id", referencedColumnName: "id" }],
  //   inverseJoinColumns: [{ name: "teacher_id", referencedColumnName: "id" }],
  // })
  // groupTeacher?: GroupTeacherEntity;

  @ManyToMany(() => TeacherEntity, (teacher) => teacher.groups)
  teachers?: TeacherEntity[];

  @ManyToMany(
    () => JustificationEntity,
    (justification) => justification.groups,
  )
  @JoinTable({
    name: "groups_justifications",
    joinColumns: [{ name: "group_id", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "justification_id", referencedColumnName: "id" },
    ],
  })
  justifications?: JustificationEntity[];

  @Column({
    name: "document_url",
    type: "varchar",
    nullable: true,
  })
  @Expose({ name: "documentFilename" })
  documentUrl?: string | null;

  @Column({
    name: "monography_url",
    type: "varchar",
    nullable: true,
  })
  @Expose({ name: "monographFilename" })
  monographyUrl?: string | null;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.group)
  schedule?: ScheduleEntity[];

  @Expose({ name: "documentUrl" })
  getDocumentUrl?(): string | null {
    if (!this.documentUrl) {
      return null;
    }

    switch (uploadConfig.driver) {
      case "disk":
        return `${process.env.APP_API_URL}/files/${this.documentUrl}`;
      case "s3":
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.documentUrl}`;
    }
  }

  @Expose({ name: "monographyUrl" })
  getMonographyUrl?(): string | null {
    if (!this.monographyUrl) {
      return null;
    }

    switch (uploadConfig.driver) {
      case "disk":
        return `${process.env.APP_API_URL}/files/${this.monographyUrl}`;
      case "s3":
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.monographyUrl}`;
    }
  }

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Exclude()
  updatedAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
