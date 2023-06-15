import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";

interface IRequest {
  id: string;
}

interface IResponse {
  user: UserEntity;
}

@injectable()
export class ShowUserService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    return {
      user,
    };
  }
}
