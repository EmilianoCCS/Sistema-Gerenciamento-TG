import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// providers
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";

interface IRequest {
  id: string;
  avatarFilename?: string;
}

interface IResponse {
  user: UserEntity;
}

@injectable()
export class UpdateUserAvatarService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    // @ts-ignore
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, avatarFilename }: IRequest): Promise<IResponse> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) {
      throw new AppError(
        MessagesHelper.ONLY_AUTHENTICATED_USERS_CAN_CHANGE_AVATAR,
        401,
      );
    }

    if (findUser.avatarUrl) {
      await this.storageProvider.deleteFile(findUser.avatarUrl);
    }

    if (!avatarFilename) {
      throw new AppError(MessagesHelper.AVATAR_FILE_IS_REQUIRED, 400);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    findUser.avatarUrl = fileName;

    const updatedUser = await this.usersRepository.update(findUser);

    return {
      user: updatedUser,
    };
  }
}
