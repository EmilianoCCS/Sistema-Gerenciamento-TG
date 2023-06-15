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
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";

interface IRequest {
  email: string;
}

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    // @ts-ignore
    @inject("MailProvider")
    private mailProvider: IMailProvider,

    // @ts-ignore
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    // @ts-ignore
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser || !findUser.id) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    const {
      secretResetToken,
      expiresInResetPasswordToken,
      expiresInResetPasswordTokenMinutes,
    } = authConfig;

    const resetPasswordToken = sign({ email }, secretResetToken, {
      subject: findUser.id,
      expiresIn: expiresInResetPasswordToken,
    });

    const resetPasswordTokenExpiresDate = this.dateProvider.addMinutes(
      expiresInResetPasswordTokenMinutes,
    );

    await this.userTokensRepository.create({
      userId: findUser.id,
      expiresDate: resetPasswordTokenExpiresDate,
      token: resetPasswordToken,
      tokenType: "reset_password",
    });

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs",
    );

    await this.mailProvider.sendMail({
      to: {
        name: findUser.fullName,
        email: findUser.email,
      },
      subject: "[SGTG] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: findUser.fullName,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${resetPasswordToken}`,
        },
      },
    });
  }
}
