// dtos
import { ICreateGroupDTO } from "@modules/groups/dtos/ICreateGroupDTO";

// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";

export interface IGroupsRepository {
  findById(id: string): Promise<GroupEntity | null>;
  findAll(): Promise<GroupEntity[]>;
  create(data: ICreateGroupDTO): Promise<GroupEntity>;
  update(group: GroupEntity): Promise<GroupEntity>;
}
