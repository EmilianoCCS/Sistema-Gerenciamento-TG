import { Request, Response } from "express";
import { container } from "tsyringe";

import { ConfirmEmailService } from "@modules/users/services/ConfirmEmailService";

export class ConfirmEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, token } = request.query as {
      email: string;
      token: string;
    };

    const confirmEmail = container.resolve(ConfirmEmailService);

    await confirmEmail.execute({
      email,
      token,
    });

    return response.status(204).end();
  }
}
