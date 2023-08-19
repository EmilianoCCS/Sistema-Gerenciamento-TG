import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuidV4 } from "uuid";

// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";

@Entity({ name: "schedules" })
export class ScheduleEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "date",
    type: "date",
    nullable: false,
  })
  date!: Date;

  @Column({
    name: "hour",
    type: "varchar",
    nullable: false,
  })
  hour!: string;

  @Column({
    name: "group_id",
    type: "uuid",
  })
  group_id!: string;

  @ManyToOne(() => GroupEntity)
  @JoinColumn({ name: "group_id" })
  group!: GroupEntity;

  @ManyToMany(() => TeacherEntity, (teacher) => teacher.schedules, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "schedules_examiners",
    joinColumns: [{ name: "schedule_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "examiner_id", referencedColumnName: "id" }],
  })
  examiners!: TeacherEntity[];

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
