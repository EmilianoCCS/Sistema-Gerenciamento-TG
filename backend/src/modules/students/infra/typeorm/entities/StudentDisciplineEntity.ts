import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity({ name: "students_disciplines" })
export class StudentDisciplineEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "student_id",
    type: "uuid",
  })
  studentId!: string;

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
