import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";
import path from "node:path";

// config
import authConfig from "@config/auth";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// users providers
import { IHashProvider } from "@modules/users/providers/HashProvider/models/IHashProvider";

// global providers
import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

interface IRequest {
  fullName?: string;
  displayName?: string;
  email: string;
  password: string;
  avatarUrl?: string;
  roleIds?: string[];
}

interface IResponse {
  user: UserEntity;
  token: string;
  refreshToken: string;
}

@injectable()
export class CreateUserService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,

    // @ts-ignore
    @inject("HashProvider")
    private hashProvider: IHashProvider,

    // @ts-ignore
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    // @ts-ignore
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    // @ts-ignore
    @inject("MailProvider")
    private mailProvider: IMailProvider,

    // @ts-ignore
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({
    fullName,
    displayName,
    email,
    password,
    avatarUrl,
    roleIds,
  }: IRequest): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(MessagesHelper.USER_ALREADY_EXISTS, 404);
    }

    const {
      secretToken,
      expiresInToken,
      secretRefreshToken,
      expiresInRefreshToken,
      expiresInRefreshTokenDays,
      secretEmailConfirmationToken,
      expiresInEmailConfirmationToken,
      expiresInEmailConfirmationTokenMinutes,
    } = authConfig;

    const hashedPassword = await this.hashProvider.generateHash(password);

    let roles: RoleEntity[] = [];

    if (roleIds && roleIds.length > 0) {
      roles = await this.rolesRepository.findByIds(roleIds);
    }

    const user = await this.usersRepository.create({
      fullName,
      displayName,
      email,
      password: hashedPassword,
      avatarUrl,
      roles,
    });

    if (!user || !user.id) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    const roleNames = user.roles.map((role) => role.name);

    // token
    const token = sign(
      {
        roles: roleNames,
      },
      secretToken,
      {
        subject: user.id,
        expiresIn: expiresInToken,
      },
    );

    // refresh token
    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresInRefreshTokenDays,
    );

    await this.userTokensRepository.create({
      userId: user.id,
      token,
      expiresDate: refreshTokenExpiresDate,
      tokenType: "refresh_token",
    });

    // email confirmation
    const confirmEmailToken = sign({}, secretEmailConfirmationToken, {
      subject: user.id,
      expiresIn: expiresInEmailConfirmationToken,
    });

    const confirmEmailExpiresDate = this.dateProvider.addMinutes(
      expiresInEmailConfirmationTokenMinutes,
    );

    await this.userTokensRepository.create({
      userId: user.id,
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
        name: user.fullName,
        email: user.email,
      },
      subject: "[SGTG] Confirmação de e-mail",
      templateData: {
        file: confirmEmailTemplate,
        variables: {
          name: user.fullName,
          link: `${process.env.APP_WEB_URL}/confirm?email=${user.email}&token=${confirmEmailToken}`,
        },
      },
    });

    return {
      user,
      token,
      refreshToken,
    };
  }
}
