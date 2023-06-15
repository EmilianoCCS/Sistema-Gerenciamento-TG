import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateGroupTeacherInviteDTO } from "@modules/groups/dtos/ICreateGroupTeacherInviteDTO";

// repositories
import { IGroupTeacherInvitesRepository } from "@modules/groups/repositories/IGroupTeacherInvitesRepository";

// entities
import { GroupTeacherInviteEntity } from "@modules/groups/infra/typeorm/entities/GroupTeacherInviteEntity";
import { IFindByTeacherIdAndGroupIdDTO } from "@modules/groups/dtos/IFindByTeacherAndGroupIdDTO";

export class GroupTeacherInvitesRepository
  implements IGroupTeacherInvitesRepository
{
  private repository: Repository<GroupTeacherInviteEntity>;

  constructor() {
    this.repository = dataSource.getRepository(GroupTeacherInviteEntity);
  }

  public async findById(id: string): Promise<GroupTeacherInviteEntity | null> {
    const groupTeacherInvite = await this.repository.findOne({
      where: {
        id,
      },
    });

    return groupTeacherInvite;
  }

  public async findByTeacherIdAndGroupId({
    groupId,
    teacherId,
  }: IFindByTeacherIdAndGroupIdDTO): Promise<GroupTeacherInviteEntity | null> {
    const groupTeacherInvite = await this.repository.findOne({
      where: {
        groupId,
        teacherId,
      },
    });

    return groupTeacherInvite;
  }

  public async create(
    data: ICreateGroupTeacherInviteDTO,
  ): Promise<GroupTeacherInviteEntity> {
    const groupTeacherInvite = this.repository.create(data);

    await this.repository.save(groupTeacherInvite);

    return groupTeacherInvite;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
