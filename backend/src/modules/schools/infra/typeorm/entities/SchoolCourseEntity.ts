import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity({ name: "schools_courses" })
export class SchoolCourseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "school_id",
    type: "uuid",
  })
  schoolId!: string;

  @Column({
    name: "course_id",
    type: "uuid",
  })
  courseId!: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
