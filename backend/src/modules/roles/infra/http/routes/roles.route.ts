import { Router } from "express";

import { RolesController } from "@modules/roles/infra/http/controllers/RolesController";

const rolesRouter = Router();

const rolesController = new RolesController();

rolesRouter.get("/", rolesController.index);
rolesRouter.post("/", rolesController.store);
rolesRouter.get("/:id", rolesController.show);
rolesRouter.put("/:id", rolesController.update);
rolesRouter.delete("/:id", rolesController.delete);

export { rolesRouter };
