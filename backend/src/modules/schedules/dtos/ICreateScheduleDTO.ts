// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";

export interface ICreateScheduleDTO {
  date: Date;
  hour: string;
  group: GroupEntity;
  examiners: TeacherEntity[];
}
