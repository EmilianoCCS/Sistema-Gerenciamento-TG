import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";
import { IGroupsRepository } from "@modules/groups/repositories/IGroupsRepository";
import { IGroupStudentInvitesRepository } from "@modules/groups/repositories/IGroupStudentInvitesRepository";

// entities
import { GroupEntity } from "@modules/groups/infra/typeorm/entities/GroupEntity";

interface IRequest {
  id: string;
  inviteId: string;
}

@injectable()
export class GroupStudentInviteAcceptService {
  constructor(
    // @ts-ignore
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,

    // @ts-ignore
    @inject("GroupsRepository")
    private groupsRepository: IGroupsRepository,

    // @ts-ignore
    @inject("GroupStudentInvitesRepository")
    private groupStudentInvitesRepository: IGroupStudentInvitesRepository,
  ) {}

  public async execute({ id, inviteId }: IRequest): Promise<void> {
    const findStudent = await this.studentsRepository.findByUserId(id);

    if (!findStudent || !findStudent.id) {
      throw new AppError(MessagesHelper.STUDENT_NOT_FOUND, 404);
    }

    const groupStudentInvite =
      await this.groupStudentInvitesRepository.findById(inviteId);

    if (!groupStudentInvite || !groupStudentInvite.id) {
      throw new AppError(MessagesHelper.GROUP_STUDENT_INVITE_NOT_FOUND, 404);
    }

    const groups: GroupEntity[] = [];

    const findGroup = await this.groupsRepository.findById(
      groupStudentInvite.groupId,
    );

    if (!findGroup || !findGroup.id) {
      throw new AppError(MessagesHelper.GROUP_NOT_FOUND, 404);
    }

    groups.push(findGroup);

    findStudent.groups = groups;

    await this.studentsRepository.update(findStudent);

    await this.groupStudentInvitesRepository.delete(groupStudentInvite.id);
  }
}
