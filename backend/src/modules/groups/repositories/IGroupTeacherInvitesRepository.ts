// dtos
import { ICreateGroupTeacherInviteDTO } from "@modules/groups/dtos/ICreateGroupTeacherInviteDTO";
import { IFindByTeacherIdAndGroupIdDTO } from "@modules/groups/dtos/IFindByTeacherAndGroupIdDTO";

// entities
import { GroupTeacherInviteEntity } from "@modules/groups/infra/typeorm/entities/GroupTeacherInviteEntity";

export interface IGroupTeacherInvitesRepository {
  findById(id: string): Promise<GroupTeacherInviteEntity | null>;
  findByTeacherIdAndGroupId(
    data: IFindByTeacherIdAndGroupIdDTO,
  ): Promise<GroupTeacherInviteEntity | null>;
  create(data: ICreateGroupTeacherInviteDTO): Promise<GroupTeacherInviteEntity>;
  delete(id: string): Promise<void>;
}
