import { Router } from "express";

import { DeactivateTeacherController } from "@modules/teachers/infra/http/controllers/DeactivateTeacherController";

const deactivateTeachersRouter = Router();

const deactivateTeacherController = new DeactivateTeacherController();

deactivateTeachersRouter.post(
  "/:id/deactivate",
  deactivateTeacherController.store,
);

export { deactivateTeachersRouter };
