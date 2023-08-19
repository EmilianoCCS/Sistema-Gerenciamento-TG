import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { v4 as uuidV4 } from "uuid";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";
import { GroupTeacherInviteEntity } from "@modules/groups/infra/typeorm/entities/GroupTeacherInviteEntity";
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";
import { ScheduleEntity } from "@modules/schedules/infra/typeorm/entities/ScheduleEntity";

@Entity({ name: "teachers" })
export class TeacherEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "user_id",
    type: "uuid",
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

  @Column({
    name: "is_activated",
    type: "boolean",
    default: true,
  })
  isActivated!: boolean;

  @ManyToOne(() => SchoolEntity)
  @JoinColumn({ name: "school_id" })
  school!: SchoolEntity;

  @OneToMany(
    () => GroupTeacherInviteEntity,
    (groupTeacherInvite) => groupTeacherInvite.teacher,
  )
  @Expose({ name: "invites" })
  groupTeacherInvites?: GroupTeacherInviteEntity[];

  @ManyToMany(() => GroupEntity, (group) => group.teachers)
  @JoinTable({
    name: "teachers_groups",
    joinColumns: [{ name: "teacher_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "group_id", referencedColumnName: "id" }],
  })
  @Expose({ name: "groups" })
  groups?: GroupEntity[];

  @ManyToMany(() => ScheduleEntity, (schedule) => schedule.examiners)
  schedules?: ScheduleEntity[];

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
