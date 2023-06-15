import { Request, Response } from "express";
import { container } from "tsyringe";

// services
import { GroupTeacherInviteDeclineService } from "@modules/groups/services/GroupTeacherInviteDeclineService";

export class GroupTeacherInviteDeclineController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { inviteId } = request.params;
    const { id } = request.user;

    const groupTeacherInviteDecline = container.resolve(
      GroupTeacherInviteDeclineService,
    );

    await groupTeacherInviteDecline.execute({
      id,
      inviteId,
    });

    return response.status(204).end();
  }
}
