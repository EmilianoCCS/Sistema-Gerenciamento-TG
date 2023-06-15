import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

interface IRequest {
  id: string;
}

@injectable()
export class DeleteUserService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser || !findUser.id) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    await this.usersRepository.delete(findUser.id);
  }
}
