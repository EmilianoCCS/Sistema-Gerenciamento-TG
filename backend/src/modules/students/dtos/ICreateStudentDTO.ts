// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

export interface ICreateStudentDTO {
  user: UserEntity;
  school: SchoolEntity;
  course: CourseEntity;
  disciplines: DisciplineEntity[];
}
