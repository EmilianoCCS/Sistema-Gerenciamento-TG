// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";
import { JustificationEntity } from "../infra/typeorm/entities/JustificationEntity";

export interface ICreateGroupDTO {
  theme: string;
  summary: string;
  teacher: TeacherEntity;
  documentUrl: string | null;
  monographyUrl: string | null;
  justifications: JustificationEntity[];
}
