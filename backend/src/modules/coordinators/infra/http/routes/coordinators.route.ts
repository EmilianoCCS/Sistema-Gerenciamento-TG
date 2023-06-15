import { Router } from "express";

import { CoordinatorsController } from "@modules/coordinators/infra/http/controllers/CoordinatorsController";

const coordinatorsRouter = Router();

const coordinatorsController = new CoordinatorsController();

coordinatorsRouter.post("/", coordinatorsController.store);

export { coordinatorsRouter };
