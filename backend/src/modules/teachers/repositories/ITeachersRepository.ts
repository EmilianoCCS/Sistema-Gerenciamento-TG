// dtos
import { ICreateTeacherDTO } from "@modules/teachers/dtos/ICreateTeacherDTO";
import { IPaginateTeachersDTO } from "@modules/teachers/dtos/IPaginateTeachersDTO";

// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";

export interface ITeachersRepository {
  findById(id: string): Promise<TeacherEntity | null>;
  findAll(): Promise<TeacherEntity[]>;
  paginate(data: IPaginateTeachersDTO): Promise<TeacherEntity[]>;
  create(data: ICreateTeacherDTO): Promise<TeacherEntity>;
  findByUserId(id: string): Promise<TeacherEntity | null>;
  update(teacher: TeacherEntity): Promise<TeacherEntity>;
}
