import { Router } from "express";

import { PermissionsController } from "@modules/permissions/infra/http/controllers/PermissionsController";

const permissionsRouter = Router();

const permissionsController = new PermissionsController();

permissionsRouter.get("/", permissionsController.index);
permissionsRouter.post("/", permissionsController.store);
permissionsRouter.get("/:id", permissionsController.show);
permissionsRouter.put("/:id", permissionsController.update);
permissionsRouter.delete("/:id", permissionsController.delete);

export { permissionsRouter };
