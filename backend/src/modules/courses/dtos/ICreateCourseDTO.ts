import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

export interface ICreateCourseDTO {
  name: string;
  disciplines: DisciplineEntity[];
}
