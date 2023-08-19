import { container } from "tsyringe";

// users providers
import "@modules/users/providers";

// global providers
import "@shared/container/providers";

// users repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";

// user tokens repositories
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";
import { UserTokensRepository } from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

// permissions repositories
import { IPermissionsRepository } from "@modules/permissions/repositories/IPermissionsRepository";
import { PermissionsRepository } from "@modules/permissions/infra/typeorm/repositories/PermissionsRepository";

// permissions repositories
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";
import { RolesRepository } from "@modules/roles/infra/typeorm/repositories/RolesRepository";

// permissions repositories
import { IRolesPermissionsRepository } from "@modules/roles/repositories/IRolesPermissionsRepository";
import { RolesPermissionsRepository } from "@modules/roles/infra/typeorm/repositories/RolesPermissionsRepository";

// teaching units repositories
import { ISchoolsRepository } from "@modules/schools/repositories/ISchoolsRepository";
import { SchoolsRepository } from "@modules/schools/infra/typeorm/repositories/SchoolsRepository";

// schools courses repositories
import { ISchoolsCoursesRepository } from "@modules/schools/repositories/ISchoolsCoursesRepository";
import { SchoolsCoursesRepository } from "@modules/schools/infra/typeorm/repositories/SchoolsCoursesRepository";

// courses repositories
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { CoursesRepository } from "@modules/courses/infra/typeorm/repositories/CoursesRepository";

// couses disciplines repositories
import { ICoursesDisciplinesRepository } from "@modules/courses/repositories/ICoursesDisciplinesRepository";
import { CoursesDisciplinesRepository } from "@modules/courses/infra/typeorm/repositories/CoursesDisciplinesRepository";

// disciplines repositories
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";
import { DisciplinesRepository } from "@modules/disciplines/infra/typeorm/repositories/DisciplinesRepository";

// students repositories
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";
import { StudentsRepository } from "@modules/students/infra/typeorm/repositories/StudentsRepository";

// teachers repositories
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { TeachersRepository } from "@modules/teachers/infra/typeorm/repositories/TeachersRepository";

// coordinators repositories
import { ICoordinatorsRepository } from "@modules/coordinators/repositories/ICoordinatorsRepository";
import { CoordinatorsRepository } from "@modules/coordinators/infra/typeorm/repositories/CoordinatorsRepository";

// groups repositories
import { IGroupsRepository } from "@modules/groups/repositories/IGroupsRepository";
import { GroupsRepository } from "@modules/groups/infra/typeorm/repositories/GroupsRepository";

// group student invites repositories
import { IGroupStudentInvitesRepository } from "@modules/groups/repositories/IGroupStudentInvitesRepository";
import { GroupStudentInvitesRepository } from "@modules/groups/infra/typeorm/repositories/GroupStudentInvitesRepository";

// group teacher invites repositories
import { IGroupTeacherInvitesRepository } from "@modules/groups/repositories/IGroupTeacherInvitesRepository";
import { GroupTeacherInvitesRepository } from "@modules/groups/infra/typeorm/repositories/GroupTeacherInvitesRepository";

// justifications repositories
import { IJustificationsRepository } from "@modules/groups/repositories/IJustificationsRepository";
import { JustificationsRepository } from "@modules/groups/infra/typeorm/repositories/JustificationsRepository";

// schedules repositories
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { SchedulesRepository } from "@modules/schedules/infra/typeorm/repositories/SchedulesRepository";

// users register
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

// user tokens register
container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository,
);

// permissions register
container.registerSingleton<IPermissionsRepository>(
  "PermissionsRepository",
  PermissionsRepository,
);

// roles register
container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository,
);

// roles permissions register
container.registerSingleton<IRolesPermissionsRepository>(
  "RolesPermissionsRepository",
  RolesPermissionsRepository,
);

// teaching units register
container.registerSingleton<ISchoolsRepository>(
  "SchoolsRepository",
  SchoolsRepository,
);

// schools courses register
container.registerSingleton<ISchoolsCoursesRepository>(
  "SchoolsCoursesRepository",
  SchoolsCoursesRepository,
);

// courses register
container.registerSingleton<ICoursesRepository>(
  "CoursesRepository",
  CoursesRepository,
);

// courses disciplines register
container.registerSingleton<ICoursesDisciplinesRepository>(
  "CoursesDisciplinesRepository",
  CoursesDisciplinesRepository,
);

// disciplines register
container.registerSingleton<IDisciplinesRepository>(
  "DisciplinesRepository",
  DisciplinesRepository,
);

// students register
container.registerSingleton<IStudentsRepository>(
  "StudentsRepository",
  StudentsRepository,
);

// teachers register
container.registerSingleton<ITeachersRepository>(
  "TeachersRepository",
  TeachersRepository,
);

// coordinators register
container.registerSingleton<ICoordinatorsRepository>(
  "CoordinatorsRepository",
  CoordinatorsRepository,
);

// groups register
container.registerSingleton<IGroupsRepository>(
  "GroupsRepository",
  GroupsRepository,
);

// group student invites register
container.registerSingleton<IGroupStudentInvitesRepository>(
  "GroupStudentInvitesRepository",
  GroupStudentInvitesRepository,
);

// group teacher invites register
container.registerSingleton<IGroupTeacherInvitesRepository>(
  "GroupTeacherInvitesRepository",
  GroupTeacherInvitesRepository,
);

// justifications register
container.registerSingleton<IJustificationsRepository>(
  "JustificationsRepository",
  JustificationsRepository,
);

// schedules register
container.registerSingleton<ISchedulesRepository>(
  "SchedulesRepository",
  SchedulesRepository,
);
