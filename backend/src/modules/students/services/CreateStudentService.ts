import { injectable, inject } from "tsyringe";

// erros
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// respositories
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";
import { ISchoolsRepository } from "@modules/schools/repositories/ISchoolsRepository";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";

// entities
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

interface IRequest {
  fullName: string;
  displayName: string;
  email: string;
  secondaryEmail?: string;
  schoolId: string;
  courseId: string;
  disciplineIds: string[];
  phone?: string;
  isWhatsapp: boolean;
  isPhoneVisible: boolean;
}

interface IResponse {
  student: StudentEntity;
}

@injectable()
export class CreateStudentService {
  constructor(
    // @ts-ignore
    @inject("StudentsRepository")
    private readonly studentsRepository: IStudentsRepository,

    // @ts-ignore
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,

    // @ts-ignore
    @inject("RolesRepository")
    private readonly rolesRepository: IRolesRepository,

    // @ts-ignore
    @inject("SchoolsRepository")
    private readonly schoolsRepository: ISchoolsRepository,

    // @ts-ignore
    @inject("CoursesRepository")
    private readonly coursesRepository: ICoursesRepository,

    // @ts-ignore
    @inject("DisciplinesRepository")
    private readonly disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute({
    fullName,
    displayName,
    email,
    secondaryEmail,
    courseId,
    schoolId,
    disciplineIds,
    phone,
    isWhatsapp,
    isPhoneVisible,
  }: IRequest): Promise<IResponse> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    const roles: RoleEntity[] = [];

    const findRole = await this.rolesRepository.findByName("student");

    if (!findRole) {
      throw new AppError(MessagesHelper.ROLE_NOT_FOUND, 404);
    }

    roles.push(findRole);

    findUser.fullName = fullName;
    findUser.displayName = displayName;

    if (secondaryEmail) {
      findUser.secondaryEmail = secondaryEmail;
    }

    if (phone) {
      findUser.phone = phone;
      findUser.isWhatsapp = isWhatsapp;
      findUser.isPhoneVisible = isPhoneVisible;
    }

    findUser.roles = roles;
    findUser.isProfileCompleted = true;

    const updateUser = await this.usersRepository.update(findUser);

    const findSchool = await this.schoolsRepository.findById(schoolId);

    if (!findSchool) {
      throw new AppError(MessagesHelper.SCHOOL_NOT_FOUND, 404);
    }

    const findCourse = await this.coursesRepository.findById(courseId);

    if (!findCourse) {
      throw new AppError(MessagesHelper.COURSE_NOT_FOUND, 404);
    }

    const disciplines: DisciplineEntity[] = [];

    for (const disciplineId of disciplineIds) {
      const findDiscipline = await this.disciplinesRepository.findById(
        disciplineId,
      );

      if (!findDiscipline) {
        throw new AppError(MessagesHelper.DISCIPLINE_NOT_FOUND, 404);
      }

      disciplines.push(findDiscipline);
    }

    const student = await this.studentsRepository.create({
      user: updateUser,
      course: findCourse,
      school: findSchool,
      disciplines,
    });

    return {
      student,
    };
  }
}
