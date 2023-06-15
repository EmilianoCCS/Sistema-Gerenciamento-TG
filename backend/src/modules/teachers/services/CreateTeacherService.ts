import { injectable, inject } from "tsyringe";

// erros
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// respositories
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";
import { ISchoolsRepository } from "@modules/schools/repositories/ISchoolsRepository";

// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

interface IRequest {
  fullName: string;
  displayName: string;
  email: string;
  schoolId: string;
}

interface IResponse {
  teacher: TeacherEntity;
}

@injectable()
export class CreateTeacherService {
  constructor(
    // @ts-ignore
    @inject("TeachersRepository")
    private readonly teachersRepository: ITeachersRepository,

    // @ts-ignore
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,

    // @ts-ignore
    @inject("RolesRepository")
    private readonly rolesRepository: IRolesRepository,

    // @ts-ignore
    @inject("SchoolsRepository")
    private readonly schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute({
    fullName,
    displayName,
    email,
    schoolId,
  }: IRequest): Promise<IResponse> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    const roles: RoleEntity[] = [];

    const findRole = await this.rolesRepository.findByName("teacher");

    if (!findRole) {
      throw new AppError(MessagesHelper.ROLE_NOT_FOUND, 404);
    }

    roles.push(findRole);

    findUser.fullName = fullName;
    findUser.displayName = displayName;
    findUser.roles = roles;
    findUser.isProfileCompleted = true;

    const updateUser = await this.usersRepository.update(findUser);

    const findSchool = await this.schoolsRepository.findById(schoolId);

    if (!findSchool) {
      throw new AppError(MessagesHelper.SCHOOL_NOT_FOUND, 404);
    }

    const teacher = await this.teachersRepository.create({
      user: updateUser,
      school: findSchool,
    });

    return {
      teacher,
    };
  }
}
