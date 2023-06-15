import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

import { ShowProfileService } from "@modules/users/services/ShowUserProfileService";

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = container.resolve(ShowProfileService);

    const { profileType, profile } = await showProfile.execute({ id });

    return response.status(200).json({
      profileType,
      profile: instanceToPlain(profile),
    });
  }
}
