// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";

export interface ICreateGroupStudentDTO {
  group: GroupEntity;
  student: StudentEntity;
}
