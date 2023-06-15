import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendEmailVerificationService } from "@modules/users/services/SendEmailVerificationService";

export class EmailVerifyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.query as { email: string };

    const sendEmailVerification = container.resolve(
      SendEmailVerificationService,
    );

    await sendEmailVerification.execute({
      email,
    });

    return response.status(204).end();
  }
}
