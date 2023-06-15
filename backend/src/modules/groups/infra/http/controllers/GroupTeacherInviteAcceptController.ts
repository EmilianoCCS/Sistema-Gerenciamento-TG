import { Request, Response } from "express";
import { container } from "tsyringe";

// services
import { GroupTeacherInviteAcceptService } from "@modules/groups/services/GroupTeacherInviteAcceptService";

export class GroupTeacherInviteAcceptController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { inviteId } = request.params;
    const { id } = request.user;

    const groupTeacherInviteAccept = container.resolve(
      GroupTeacherInviteAcceptService,
    );

    await groupTeacherInviteAccept.execute({
      id,
      inviteId,
    });

    return response.status(204).end();
  }
}
