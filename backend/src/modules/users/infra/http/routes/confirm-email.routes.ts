import { Router } from "express";

import { ConfirmEmailController } from "@modules/users/infra/http/controllers/ConfirmEmailController";

const confirmEmailRouter = Router();

const confirmEmailController = new ConfirmEmailController();

confirmEmailRouter.post("/", confirmEmailController.create);

export { confirmEmailRouter };
