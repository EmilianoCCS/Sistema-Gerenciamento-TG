import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// providers
import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";

interface IRequest {
  email: string;
  token: string;
}

@injectable()
export class ConfirmEmailService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    // @ts-ignore
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    // @ts-ignore
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ email, token }: IRequest) {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    const findUserToken = await this.userTokensRepository.findByToken(token);

    if (!findUserToken) {
      throw new AppError(MessagesHelper.USER_TOKEN_NOT_FOUND, 404);
    }

    if (findUserToken.userId !== findUser.id) {
      throw new AppError(MessagesHelper.USER_TOKEN_NOT_FOUND, 404);
    }

    const tokenCreatedAt = findUserToken.createdAt;

    const compareDate = this.dateProvider.compareData(tokenCreatedAt, 2);

    const isAfter = this.dateProvider.isAfter(Date.now(), compareDate);

    if (isAfter) {
      throw new AppError(MessagesHelper.USER_TOKEN_EXPIRED, 401);
    }

    findUser.isEmailVerified = true;

    await this.usersRepository.update(findUser);
  }
}
