import { Router } from "express";

import { ActivateTeacherController } from "@modules/teachers/infra/http/controllers/ActivateTeacherController";

const activateTeachersRouter = Router();

const activateTeacherController = new ActivateTeacherController();

activateTeachersRouter.post("/:id/activate", activateTeacherController.store);

export { activateTeachersRouter };
