import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// providers
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";

// repositories
import { IGroupsRepository } from "@modules/groups/repositories/IGroupsRepository";

// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";

interface IRequest {
  id: string;
  monographFilename: string;
}

interface IResponse {
  group: GroupEntity;
}

@injectable()
export class UpdateMonographFileService {
  constructor(
    // @ts-ignore
    @inject("GroupsRepository")
    private groupsRepository: IGroupsRepository,

    // @ts-ignore
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    monographFilename,
  }: IRequest): Promise<IResponse> {
    const findGroup = await this.groupsRepository.findById(id);

    if (!findGroup) {
      throw new AppError(MessagesHelper.GROUP_NOT_FOUND, 404);
    }

    if (findGroup.monographyUrl) {
      await this.storageProvider.deleteFile(findGroup.monographyUrl);
    }

    const fileName = await this.storageProvider.saveFile(monographFilename);

    findGroup.monographyUrl = fileName;

    const updatedGroup = await this.groupsRepository.update(findGroup);

    return {
      group: updatedGroup,
    };
  }
}
