import { Router } from "express";

import { SchoolsController } from "@modules/schools/infra/http/controllers/SchoolsController";

const schoolsRouter = Router();

const schoolsController = new SchoolsController();

schoolsRouter.get("/", schoolsController.index);
schoolsRouter.post("/", schoolsController.store);
schoolsRouter.get("/:id", schoolsController.show);
schoolsRouter.put("/:id", schoolsController.update);
schoolsRouter.delete("/:id", schoolsController.index);

export { schoolsRouter };
