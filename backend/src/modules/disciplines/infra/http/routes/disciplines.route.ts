import { Router } from "express";

import { DisciplinesController } from "@modules/disciplines/infra/http/controllers/DisciplinesController";

const disciplinesRouter = Router();

const disciplinesController = new DisciplinesController();

disciplinesRouter.get("/", disciplinesController.index);
disciplinesRouter.post("/", disciplinesController.store);
disciplinesRouter.get("/:id", disciplinesController.show);
disciplinesRouter.put("/:id", disciplinesController.update);
disciplinesRouter.delete("/:id", disciplinesController.delete);

export { disciplinesRouter };
