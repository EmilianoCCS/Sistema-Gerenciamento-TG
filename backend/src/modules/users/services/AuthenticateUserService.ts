import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";

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

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { ICoordinatorsRepository } from "@modules/coordinators/repositories/ICoordinatorsRepository";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";
import { CoordinatorEntity } from "@modules/coordinators/infra/typeorm/entities/CoordinatorEntity";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: UserEntity;
  profileType?: "student" | "teacher" | "coordinator";
  profile?: StudentEntity | TeacherEntity | CoordinatorEntity;
  token: string;
  refreshToken: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

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
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,

    // @ts-ignore
    @inject("TeachersRepository")
    private teachersRepository: ITeachersRepository,

    // @ts-ignore
    @inject("CoordinatorsRepository")
    private coordinatorsRepository: ICoordinatorsRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !user.id) {
      throw new AppError(MessagesHelper.EMAIL_OR_PASSWORD_INVALID, 401);
    }

    const {
      secretToken,
      expiresInToken,
      secretRefreshToken,
      expiresInRefreshToken,
      expiresInRefreshTokenDays,
    } = authConfig;

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError(MessagesHelper.EMAIL_OR_PASSWORD_INVALID, 401);
    }

    await this.userTokensRepository.deleteAllByUserIdAndTokenType(
      user.id,
      "refresh_token",
    );

    const rolesNames = user.roles.map((role) => role.name);

    let profileType: "student" | "teacher" | "coordinator" | undefined =
      undefined;
    let profile: StudentEntity | TeacherEntity | CoordinatorEntity | undefined =
      undefined;

    if (rolesNames.includes("student")) {
      profileType = "student";

      const student = await this.studentsRepository.findByUserId(user.id);

      if (!student) {
        throw new AppError(MessagesHelper.STUDENT_NOT_FOUND, 404);
      }

      profile = student;
    } else if (rolesNames.includes("teacher")) {
      profileType = "teacher";

      const teacher = await this.teachersRepository.findByUserId(user.id);

      if (!teacher) {
        throw new AppError(MessagesHelper.TEACHER_NOT_FOUND, 404);
      }

      profile = teacher;
    } else if (rolesNames.includes("coordinator")) {
      profileType = "coordinator";

      const coordinator = await this.coordinatorsRepository.findByUserId(
        user.id,
      );

      if (!coordinator) {
        throw new AppError(MessagesHelper.COORDINATOR_NOT_FOUND, 404);
      }

      profile = coordinator;
    }

    const token = sign(
      {
        roles: rolesNames,
      },
      secretToken,
      {
        subject: user.id,
        expiresIn: expiresInToken,
      },
    );

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresInRefreshTokenDays,
    );

    await this.userTokensRepository.create({
      userId: user.id,
      token: refreshToken,
      expiresDate: refreshTokenExpiresDate,
      tokenType: "refresh_token",
    });

    return {
      user,
      profileType,
      profile,
      token,
      refreshToken,
    };
  }
}
