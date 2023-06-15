import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// providers
import { IHashProvider } from "@modules/users/providers/HashProvider/models/IHashProvider";
import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordService {
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

    // @ts-ignore
    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const findUserToken = await this.userTokensRepository.findByToken(token);

    if (!findUserToken) {
      throw new AppError(MessagesHelper.USER_TOKEN_NOT_FOUND, 404);
    }

    const findUser = await this.usersRepository.findById(findUserToken.userId);

    if (!findUser) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    const tokenCreatedAt = findUserToken.createdAt;

    const compareDate = this.dateProvider.compareData(tokenCreatedAt, 2);

    const isAfter = this.dateProvider.isAfter(Date.now(), compareDate);

    if (isAfter) {
      throw new AppError(MessagesHelper.USER_TOKEN_EXPIRED, 401);
    }

    findUser.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.update(findUser);
  }
}
