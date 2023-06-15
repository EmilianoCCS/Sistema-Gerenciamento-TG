// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";

export interface ICreateGroupTeacherDTO {
  group: GroupEntity;
  teacher: TeacherEntity;
}
