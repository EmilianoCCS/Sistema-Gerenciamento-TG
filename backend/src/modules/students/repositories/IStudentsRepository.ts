import { ICreateStudentDTO } from "@modules/students/dtos/ICreateStudentDTO";

// entities
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";

export interface IStudentsRepository {
  create(data: ICreateStudentDTO): Promise<StudentEntity>;
  findByUserId(id: string): Promise<StudentEntity | null>;
  findByEmail(email: string): Promise<StudentEntity | null>;
  update(student: StudentEntity): Promise<StudentEntity>;
}
