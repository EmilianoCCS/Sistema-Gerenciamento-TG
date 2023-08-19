import { injectable, inject } from "tsyringe";

// repositories
import { IGroupsRepository } from "@modules/groups/repositories/IGroupsRepository";

// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";

interface IResponse {
  groups: GroupEntity[];
}

@injectable()
export class ListGroupsService {
  constructor(
    // @ts-ignore
    @inject("GroupsRepository")
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const groups = await this.groupsRepository.findAll();

    return {
      groups,
    };
  }
}
