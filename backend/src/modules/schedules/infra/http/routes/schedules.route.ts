import { Router } from "express";

import { SchedulesController } from "@modules/schedules/infra/http/controllers/SchedulesController";

const schedulesRouter = Router();

const schedulesController = new SchedulesController();

schedulesRouter.post("/", schedulesController.store);

export { schedulesRouter };
