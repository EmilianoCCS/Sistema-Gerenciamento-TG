import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";
import { CoordinatorEntity } from "@modules/coordinators/infra/typeorm/entities/CoordinatorEntity";
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { ICoordinatorsRepository } from "@modules/coordinators/repositories/ICoordinatorsRepository";

interface IRequest {
  id: string;
}

interface IResponse {
  profileType?: "student" | "teacher" | "coordinator";
  profile?: StudentEntity | TeacherEntity | CoordinatorEntity;
}

@injectable()
export class ShowProfileService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

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

  public async execute({ id }: IRequest): Promise<IResponse> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser || !findUser.id) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    const rolesNames = findUser.roles.map((role) => role.name);

    let profileType: "student" | "teacher" | "coordinator" | undefined =
      undefined;
    let profile: StudentEntity | TeacherEntity | CoordinatorEntity | undefined =
      undefined;

    if (rolesNames.includes("student")) {
      profileType = "student";

      const student = await this.studentsRepository.findByUserId(findUser.id);

      if (!student) {
        throw new AppError(MessagesHelper.STUDENT_NOT_FOUND, 404);
      }

      profile = student;
    } else if (rolesNames.includes("teacher")) {
      profileType = "teacher";

      const teacher = await this.teachersRepository.findByUserId(findUser.id);

      if (!teacher) {
        throw new AppError(MessagesHelper.TEACHER_NOT_FOUND, 404);
      }

      profile = teacher;
    } else if (rolesNames.includes("coordinator")) {
      profileType = "coordinator";

      const coordinator = await this.coordinatorsRepository.findByUserId(
        findUser.id,
      );

      if (!coordinator) {
        throw new AppError(MessagesHelper.COORDINATOR_NOT_FOUND, 404);
      }

      profile = coordinator;
    }

    return {
      profileType,
      profile,
    };
  }
}
