import { Router } from "express";

import { TeachersController } from "@modules/teachers/infra/http/controllers/TeachersController";

// routes
import { activateTeachersRouter } from "@modules/teachers/infra/http/routes/activate-teachers.route";
import { deactivateTeachersRouter } from "@modules/teachers/infra/http/routes/deactivate-teachers.route";

const teachersRouter = Router();

const teachersController = new TeachersController();

teachersRouter.use("/", activateTeachersRouter);
teachersRouter.use("/", deactivateTeachersRouter);

teachersRouter.get("/", teachersController.index);
teachersRouter.post("/", teachersController.store);
teachersRouter.get("/:id", teachersController.show);

export { teachersRouter };
