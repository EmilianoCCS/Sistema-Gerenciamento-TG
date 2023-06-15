import { Router } from "express";

// controllers
import { ProfileController } from "@modules/users/infra/http/controllers/ProfileController";

// middlewares
import { ensureAuthenticated } from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.get("/", ensureAuthenticated, profileController.show);

export { profileRouter };
