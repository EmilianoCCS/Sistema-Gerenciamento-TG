import { Router } from "express";

import { TeachersController } from "@modules/teachers/infra/http/controllers/TeachersController";

const teachersRouter = Router();

const teachersController = new TeachersController();

teachersRouter.get("/", teachersController.index);
teachersRouter.post("/", teachersController.store);
teachersRouter.get("/:id", teachersController.show);

export { teachersRouter };
