import { Router } from "express";
import multer from "multer";

// config
import uploadConfig from "@config/upload";

import { UploadMonographFileController } from "@modules/groups/infra/http/controllers/UploadMonographFileController";

const monographiesRouter = Router();
const upload = multer(uploadConfig.multer);

const uploadMonographFileController = new UploadMonographFileController();

monographiesRouter.patch(
  "/",
  upload.single("monographFile"),
  uploadMonographFileController.update,
);

export { monographiesRouter };
