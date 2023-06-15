import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity({ name: "courses_disciplines" })
export class CourseDisciplineEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "course_id",
    type: "uuid",
  })
  courseId!: string;

  @Column({
    name: "discipline_id",
    type: "uuid",
  })
  disciplineId!: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
