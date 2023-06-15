import { Router } from "express";
import multer from "multer";

// config
import uploadConfig from "@config/upload";

// controllers
import { UsersController } from "@modules/users/infra/http/controllers/UsersController";
import { UserAvatarController } from "@modules/users/infra/http/controllers/UserAvatarController";

// middlewares
import { ensureAuthenticated } from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.get("/", usersController.index);
usersRouter.post("/", usersController.store);
usersRouter.get("/:id", usersController.show);
usersRouter.put("/:id", usersController.update);
usersRouter.delete("/:id", usersController.delete);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update,
);

export { usersRouter };
