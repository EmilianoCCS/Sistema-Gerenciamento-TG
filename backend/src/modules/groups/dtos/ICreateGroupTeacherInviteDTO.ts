// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";

export interface ICreateGroupTeacherInviteDTO {
  group: GroupEntity;
  teacher: TeacherEntity;
}
