import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { v4 as uuidV4 } from "uuid";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";
import { GroupStudentInviteEntity } from "@modules/groups/infra/typeorm/entities/GroupStudentInviteEntity";
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";

@Entity({ name: "students" })
export class StudentEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "user_id",
    type: "varchar",
  })
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @Column({
    name: "school_id",
    type: "uuid",
  })
  schoolId!: string;

  @ManyToOne(() => SchoolEntity)
  @JoinColumn({ name: "school_id" })
  school!: SchoolEntity;

  @Column({
    name: "course_id",
    type: "uuid",
  })
  courseId!: string;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: "course_id" })
  course!: CourseEntity;

  @ManyToMany(() => DisciplineEntity, (discipline) => discipline.students, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "students_disciplines",
    joinColumns: [{ name: "student_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "discipline_id", referencedColumnName: "id" }],
  })
  disciplines!: DisciplineEntity[];

  // @OneToOne(() => GroupStudentEntity, (groupStudent) => groupStudent.student)
  // @JoinTable({
  //   name: "groups_students",
  //   joinColumns: [{ name: "student_id", referencedColumnName: "id" }],
  //   inverseJoinColumns: [{ name: "group_id", referencedColumnName: "id" }],
  // })
  // @Expose({ name: "group" })
  // groupStudent?: GroupStudentEntity;

  @ManyToMany(() => GroupEntity, (group) => group.students)
  @JoinTable({
    name: "students_groups",
    joinColumns: [{ name: "student_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "group_id", referencedColumnName: "id" }],
  })
  groups?: GroupEntity[];

  @OneToMany(
    () => GroupStudentInviteEntity,
    (groupStudentInvite) => groupStudentInvite.student,
  )
  @Expose({ name: "invites" })
  groupStudentInvites?: GroupStudentInviteEntity[];

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
