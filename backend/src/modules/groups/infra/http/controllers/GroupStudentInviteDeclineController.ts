import { Request, Response } from "express";
import { container } from "tsyringe";

// services
import { GroupStudentInviteDeclineService } from "@modules/groups/services/GroupStudentInviteDeclineService";

export class GroupStudentInviteDeclineController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { inviteId } = request.params;
    const { id } = request.user;

    const groupStudentInviteDecline = container.resolve(
      GroupStudentInviteDeclineService,
    );

    await groupStudentInviteDecline.execute({
      id,
      inviteId,
    });

    return response.status(204).end();
  }
}
