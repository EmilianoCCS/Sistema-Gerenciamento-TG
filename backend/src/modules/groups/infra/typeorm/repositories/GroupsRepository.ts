import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateGroupDTO } from "@modules/groups/dtos/ICreateGroupDTO";

// repositories
import { IGroupsRepository } from "@modules/groups/repositories/IGroupsRepository";

// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";

export class GroupsRepository implements IGroupsRepository {
  private repository: Repository<GroupEntity>;

  constructor() {
    this.repository = dataSource.getRepository(GroupEntity);
  }

  public async findById(id: string): Promise<GroupEntity | null> {
    const group = await this.repository.findOne({
      where: { id },
      relations: [
        "groupStudentInvites",
        "groupStudentInvites.student.user",
        "students",
        "students.user",
        "groupTeacherInvites",
        "groupTeacherInvites.teacher.user",
        "teachers",
        "teachers.user",
        "justifications",
      ],
    });

    return group;
  }

  public async create(data: ICreateGroupDTO): Promise<GroupEntity> {
    const group = this.repository.create(data);

    await this.repository.save(group);

    return group;
  }

  public async update(group: GroupEntity): Promise<GroupEntity> {
    return this.repository.save(group);
  }
}
