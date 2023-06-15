import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";
import path from "node:path";

// config
import authConfig from "@config/auth";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// providers
import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";

interface IRequest {
  email: string;
}

@injectable()
export class SendEmailVerificationService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,

    // @ts-ignore
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    // @ts-ignore
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    // @ts-ignore
    @inject("MailProvider")
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest) {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser || !findUser.id) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    await this.userTokensRepository.deleteAllByUserIdAndTokenType(
      findUser.id,
      "email_confirmation",
    );

    const {
      secretEmailConfirmationToken,
      expiresInEmailConfirmationToken,
      expiresInEmailConfirmationTokenMinutes,
    } = authConfig;

    const confirmEmailToken = sign({}, secretEmailConfirmationToken, {
      subject: findUser.id,
      expiresIn: expiresInEmailConfirmationToken,
    });

    const confirmEmailExpiresDate = this.dateProvider.addMinutes(
      expiresInEmailConfirmationTokenMinutes,
    );

    await this.userTokensRepository.create({
      userId: findUser.id,
      token: confirmEmailToken,
      expiresDate: confirmEmailExpiresDate,
      tokenType: "email_confirmation",
    });

    const confirmEmailTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "email_verify.hbs",
    );

    await this.mailProvider.sendMail({
      to: {
        name: findUser.fullName,
        email: findUser.email,
      },
      subject: "[SGTG] Confirmação de e-mail",
      templateData: {
        file: confirmEmailTemplate,
        variables: {
          name: findUser.fullName,
          link: `${process.env.APP_WEB_URL}/confirm?email=${findUser.email}&token=${confirmEmailToken}`,
        },
      },
    });
  }
}
