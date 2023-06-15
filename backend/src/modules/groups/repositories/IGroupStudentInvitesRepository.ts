// dtos
import { ICreateGroupStudentInviteDTO } from "@modules/groups/dtos/ICreateGroupStudentInviteDTO";
import { IFindByStudentIdAndGroupIdDTO } from "@modules/groups/dtos/IFindByStudentIdAndGroupIdDTO";

// entities
import { GroupStudentInviteEntity } from "@modules/groups/infra/typeorm/entities/GroupStudentInviteEntity";

export interface IGroupStudentInvitesRepository {
  findById(id: string): Promise<GroupStudentInviteEntity | null>;
  findByStudentIdAndGroupId(
    data: IFindByStudentIdAndGroupIdDTO,
  ): Promise<GroupStudentInviteEntity | null>;
  create(data: ICreateGroupStudentInviteDTO): Promise<GroupStudentInviteEntity>;
  delete(id: string): Promise<void>;
}
