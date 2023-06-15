import { Router } from "express";

import { StudentsController } from "@modules/students/infra/http/controllers/StudentsController";

const studentsRouter = Router();

const studentsController = new StudentsController();

studentsRouter.post("/", studentsController.store);

export { studentsRouter };
