import { Router } from "express";

import { ResetPasswordController } from "@modules/users/infra/http/controllers/ResetPasswordController";

const resetPasswordRouter = Router();

const resetPasswordController = new ResetPasswordController();

resetPasswordRouter.post("/", resetPasswordController.create);

export { resetPasswordRouter };
