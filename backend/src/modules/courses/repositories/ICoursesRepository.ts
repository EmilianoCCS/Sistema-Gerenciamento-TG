// dtos
import { ICreateCourseDTO } from "@modules/courses/dtos/ICreateCourseDTO";

// entities
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

export interface ICoursesRepository {
  findById(id: string): Promise<CourseEntity | null>;
  findByName(name: string): Promise<CourseEntity | null>;
  findByIds(ids: string[]): Promise<CourseEntity[]>;
  findAll(): Promise<CourseEntity[]>;
  create(data: ICreateCourseDTO): Promise<CourseEntity>;
  update(course: CourseEntity): Promise<CourseEntity>;
  delete(id: string): Promise<void>;
}
