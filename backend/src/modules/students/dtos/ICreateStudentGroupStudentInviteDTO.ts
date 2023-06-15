// entities
import { GroupStudentInviteEntity } from "@modules/groups/infra/typeorm/entities/GroupStudentInviteEntity";
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";

export interface ICreateStudentGroupStudentInviteDTO {
  student: StudentEntity;
  groupStudentInvite: GroupStudentInviteEntity;
}
