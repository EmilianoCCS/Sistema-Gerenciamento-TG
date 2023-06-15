import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";
import { IGroupStudentInvitesRepository } from "@modules/groups/repositories/IGroupStudentInvitesRepository";

interface IRequest {
  id: string;
  inviteId: string;
}

@injectable()
export class GroupStudentInviteDeclineService {
  constructor(
    // @ts-ignore
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,

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

    await this.groupStudentInvitesRepository.delete(groupStudentInvite.id);
  }
}
