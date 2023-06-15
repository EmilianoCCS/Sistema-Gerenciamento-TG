import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuidV4 } from "uuid";

// entities
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";

@Entity({ name: "disciplines" })
export class DisciplineEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
  })
  name!: string;

  @ManyToMany(() => CourseEntity, (course) => course.disciplines)
  courses!: CourseEntity[];

  @ManyToMany(() => StudentEntity, (student) => student.disciplines)
  students!: StudentEntity[];

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
