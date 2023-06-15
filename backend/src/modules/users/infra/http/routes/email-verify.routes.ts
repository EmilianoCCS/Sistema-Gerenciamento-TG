import { Router } from "express";

import { EmailVerifyController } from "@modules/users/infra/http/controllers/EmailVerifyController";

const emailVerifyRouter = Router();

const emailVerifyController = new EmailVerifyController();

emailVerifyRouter.post("/", emailVerifyController.create);

export { emailVerifyRouter };
