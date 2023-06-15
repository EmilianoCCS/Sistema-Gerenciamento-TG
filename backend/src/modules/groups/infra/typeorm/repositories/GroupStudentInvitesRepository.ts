import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateGroupStudentInviteDTO } from "@modules/groups/dtos/ICreateGroupStudentInviteDTO";

// repositories
import { IGroupStudentInvitesRepository } from "@modules/groups/repositories/IGroupStudentInvitesRepository";

// entities
import { GroupStudentInviteEntity } from "@modules/groups/infra/typeorm/entities/GroupStudentInviteEntity";
import { IFindByStudentIdAndGroupIdDTO } from "@modules/groups/dtos/IFindByStudentIdAndGroupIdDTO";

export class GroupStudentInvitesRepository
  implements IGroupStudentInvitesRepository
{
  private repository: Repository<GroupStudentInviteEntity>;

  constructor() {
    this.repository = dataSource.getRepository(GroupStudentInviteEntity);
  }

  public async findById(id: string): Promise<GroupStudentInviteEntity | null> {
    const groupStudentInvite = await this.repository.findOne({
      where: {
        id,
      },
    });

    return groupStudentInvite;
  }

  public async findByStudentIdAndGroupId({
    studentId,
    groupId,
  }: IFindByStudentIdAndGroupIdDTO): Promise<GroupStudentInviteEntity | null> {
    const groupStudentInvite = await this.repository.findOne({
      where: {
        studentId,
        groupId,
      },
    });

    return groupStudentInvite;
  }

  public async create(
    data: ICreateGroupStudentInviteDTO,
  ): Promise<GroupStudentInviteEntity> {
    const groupStudentInvite = this.repository.create(data);

    await this.repository.save(groupStudentInvite);

    return groupStudentInvite;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
