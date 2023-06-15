// entities
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";

export interface ICreateGroupStudentInviteDTO {
  group: GroupEntity;
  student: StudentEntity;
}
