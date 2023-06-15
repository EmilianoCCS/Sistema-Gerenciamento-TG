import { injectable, inject } from "tsyringe";
import path from "node:path";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// providers
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";

// repositories
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { IGroupsRepository } from "@modules/groups/repositories/IGroupsRepository";
import { IGroupStudentInvitesRepository } from "@modules/groups/repositories/IGroupStudentInvitesRepository";
import { IGroupTeacherInvitesRepository } from "@modules/groups/repositories/IGroupTeacherInvitesRepository";
import { IJustificationsRepository } from "../repositories/IJustificationsRepository";

// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";
import { JustificationEntity } from "@modules/groups/infra/typeorm/entities/JustificationEntity";

interface IRequest {
  id: string;
  emails?: string[];
  theme: string;
  summary: string;
  justifications: string[];
  teacherId: string;
  documentFilename?: string;
  monographFilename?: string;
}

interface IResponse {
  group: GroupEntity;
}

@injectable()
export class CreateGroupService {
  constructor(
    // @ts-ignore
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,

    // @ts-ignore
    @inject("TeachersRepository")
    private teachersRepository: ITeachersRepository,

    // @ts-ignore
    @inject("GroupsRepository")
    private groupsRepository: IGroupsRepository,

    // @ts-ignore
    @inject("GroupStudentInvitesRepository")
    private groupStudentInvitesRepository: IGroupStudentInvitesRepository,

    // @ts-ignore
    @inject("GroupTeacherInvitesRepository")
    private groupTeacherInvitesRepository: IGroupTeacherInvitesRepository,

    // @ts-ignore
    @inject("JustificationsRepository")
    private justificationsRepository: IJustificationsRepository,

    // @ts-ignore
    @inject("MailProvider")
    private mailProvider: IMailProvider,

    // @ts-ignore
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    emails,
    theme,
    summary,
    justifications,
    teacherId,
    documentFilename,
    monographFilename,
  }: IRequest): Promise<IResponse> {
    const findStudent = await this.studentsRepository.findByUserId(id);

    if (!findStudent) {
      throw new AppError(MessagesHelper.STUDENT_NOT_FOUND, 404);
    }

    const findTeacher = await this.teachersRepository.findById(teacherId);

    if (!findTeacher) {
      throw new AppError(MessagesHelper.TEACHER_NOT_FOUND, 404);
    }

    let documentUrl: string | null = null;
    let monographyUrl: string | null = null;

    const justificationsList: JustificationEntity[] = [];

    for (const text of justifications) {
      const justification = await this.justificationsRepository.create({
        text,
      });

      justificationsList.push(justification);
    }

    if (documentFilename) {
      documentUrl = await this.storageProvider.saveFile(documentFilename);
    }

    if (monographFilename) {
      monographyUrl = await this.storageProvider.saveFile(monographFilename);
    }

    const groups: GroupEntity[] = [];

    const group = await this.groupsRepository.create({
      theme,
      summary,
      teacher: findTeacher,
      documentUrl,
      monographyUrl,
      justifications: justificationsList,
    });

    groups.push(group);

    findStudent.groups = groups;

    await this.studentsRepository.update(findStudent);

    await this.groupTeacherInvitesRepository.create({
      group,
      teacher: findTeacher,
    });

    const inviteEmailTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "invite_teacher.hbs",
    );

    await this.mailProvider.sendMail({
      to: {
        name: findTeacher.user.fullName,
        email: findTeacher.user.email,
      },
      subject: "[SGTG] Confirmação de e-mail",
      templateData: {
        file: inviteEmailTemplate,
        variables: {
          name: findTeacher.user.fullName,
          theme,
          link: `${process.env.APP_WEB_URL}/dashboard`,
        },
      },
    });

    if (emails && emails.length > 0) {
      for (const email of emails) {
        const guest = await this.studentsRepository.findByEmail(email);

        if (
          !guest ||
          !guest.user.isEmailVerified ||
          !guest.user.isProfileCompleted
        ) {
          return {
            group,
          };
        }

        await this.groupStudentInvitesRepository.create({
          student: guest,
          group,
        });

        const inviteEmailTemplate = path.resolve(
          __dirname,
          "..",
          "views",
          "invite_student.hbs",
        );

        await this.mailProvider.sendMail({
          to: {
            name: guest.user.fullName,
            email: guest.user.email,
          },
          subject: "[SGTG] Confirmação de e-mail",
          templateData: {
            file: inviteEmailTemplate,
            variables: {
              name: guest.user.fullName,
              theme,
              link: `${process.env.APP_WEB_URL}/dashboard`,
            },
          },
        });
      }
    }

    return {
      group,
    };
  }
}
