import { Router } from "express";

import { CoursesController } from "@modules/courses/infra/http/controllers/CoursesController";

const coursesRouter = Router();

const coursesController = new CoursesController();

coursesRouter.get("/", coursesController.index);
coursesRouter.post("/", coursesController.store);
coursesRouter.get("/:id", coursesController.show);
coursesRouter.put("/:id", coursesController.update);
coursesRouter.delete("/:id", coursesController.delete);

export { coursesRouter };
