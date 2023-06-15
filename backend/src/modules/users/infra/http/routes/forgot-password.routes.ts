import { Router } from "express";

import { ForgotPasswordController } from "@modules/users/infra/http/controllers/ForgotPasswordController";

const forgotPasswordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();

forgotPasswordRouter.post("/", forgotPasswordController.create);

export { forgotPasswordRouter };
