import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Exclude } from "class-transformer";

// entities
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

@Entity({ name: "schools" })
export class SchoolEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
  })
  name!: string;

  @ManyToMany(() => CourseEntity, (course) => course.schools, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "schools_courses",
    joinColumns: [{ name: "school_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "course_id", referencedColumnName: "id" }],
  })
  courses!: CourseEntity[];

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
