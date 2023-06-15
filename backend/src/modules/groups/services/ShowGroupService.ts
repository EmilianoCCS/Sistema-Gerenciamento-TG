import { injectable, inject } from "tsyringe";

// repositories
import { IGroupsRepository } from "@modules/groups/repositories/IGroupsRepository";

// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";
import { AppError } from "@shared/errors/AppError";
import { MessagesHelper } from "@helpers/MessagesHelper";

interface IRequest {
  id: string;
}

interface IResponse {
  group: GroupEntity;
}

@injectable()
export class ShowGroupService {
  constructor(
    // @ts-ignore
    @inject("GroupsRepository")
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const findGroup = await this.groupsRepository.findById(id);

    if (!findGroup) {
      throw new AppError(MessagesHelper.GROUP_NOT_FOUND, 404);
    }

    return {
      group: findGroup,
    };
  }
}
