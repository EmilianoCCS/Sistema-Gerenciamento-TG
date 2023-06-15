import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { IGroupsRepository } from "@modules/groups/repositories/IGroupsRepository";
import { IGroupTeacherInvitesRepository } from "@modules/groups/repositories/IGroupTeacherInvitesRepository";
import { GroupEntity } from "../infra/typeorm/entities/GroupEntity";

interface IRequest {
  id: string;
  inviteId: string;
}

@injectable()
export class GroupTeacherInviteAcceptService {
  constructor(
    // @ts-ignore
    @inject("TeachersRepository")
    private teachersRepository: ITeachersRepository,

    // @ts-ignore
    @inject("GroupsRepository")
    private groupsRepository: IGroupsRepository,

    // @ts-ignore
    @inject("GroupTeacherInvitesRepository")
    private groupTeacherInvitesRepository: IGroupTeacherInvitesRepository,
  ) {}

  public async execute({ id, inviteId }: IRequest): Promise<void> {
    const findTeacher = await this.teachersRepository.findByUserId(id);

    if (!findTeacher || !findTeacher.id) {
      throw new AppError(MessagesHelper.TEACHER_NOT_FOUND, 404);
    }

    const groupTeacherInvite =
      await this.groupTeacherInvitesRepository.findById(inviteId);

    if (!groupTeacherInvite || !groupTeacherInvite.id) {
      throw new AppError(MessagesHelper.GROUP_TEACHER_INVITE_NOT_FOUND, 404);
    }

    let groups: GroupEntity[] = [];

    const findGroup = await this.groupsRepository.findById(
      groupTeacherInvite.groupId,
    );

    if (!findGroup || !findGroup.id) {
      throw new AppError(MessagesHelper.GROUP_NOT_FOUND, 404);
    }

    groups = findTeacher.groups ? findTeacher.groups : [];

    groups.push(findGroup);

    findTeacher.groups = groups;

    await this.groupTeacherInvitesRepository.delete(groupTeacherInvite.id);

    await this.teachersRepository.update(findTeacher);
  }
}
