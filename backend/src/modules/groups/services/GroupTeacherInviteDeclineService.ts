import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { IGroupTeacherInvitesRepository } from "@modules/groups/repositories/IGroupTeacherInvitesRepository";

interface IRequest {
  id: string;
  inviteId: string;
}

@injectable()
export class GroupTeacherInviteDeclineService {
  constructor(
    // @ts-ignore
    @inject("TeachersRepository")
    private teachersRepository: ITeachersRepository,

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

    await this.groupTeacherInvitesRepository.delete(groupTeacherInvite.id);
  }
}
