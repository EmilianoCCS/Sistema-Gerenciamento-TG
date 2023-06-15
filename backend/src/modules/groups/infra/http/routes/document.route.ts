import { Router } from "express";
import multer from "multer";

// config
import uploadConfig from "@config/upload";

import { UploadDocumentFileController } from "@modules/groups/infra/http/controllers/UploadDocumentFileController";

const documentsRouter = Router();
const upload = multer(uploadConfig.multer);

const uploadDocumentFileController = new UploadDocumentFileController();

documentsRouter.patch(
  "/",
  upload.single("documentFile"),
  uploadDocumentFileController.update,
);

export { documentsRouter };
