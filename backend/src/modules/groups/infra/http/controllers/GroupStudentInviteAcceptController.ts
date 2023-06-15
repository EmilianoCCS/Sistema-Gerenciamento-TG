import { Request, Response } from "express";
import { container } from "tsyringe";

// services
import { GroupStudentInviteAcceptService } from "@modules/groups/services/GroupStudentInviteAcceptService";

export class GroupStudentInviteAcceptController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { inviteId } = request.params;
    const { id } = request.user;

    const groupStudentInviteAccept = container.resolve(
      GroupStudentInviteAcceptService,
    );

    await groupStudentInviteAccept.execute({
      id,
      inviteId,
    });

    return response.status(204).end();
  }
}
