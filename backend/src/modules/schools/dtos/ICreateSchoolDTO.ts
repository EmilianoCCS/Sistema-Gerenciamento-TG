import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

export interface ICreateSchoolDTO {
  name: string;
  courses: CourseEntity[];
}
