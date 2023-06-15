import { Router } from "express";
import multer from "multer";

// config
import uploadConfig from "@config/upload";

// controllers
import { GroupsController } from "@modules/groups/infra/http/controllers/GroupsController";
import { GroupStudentInviteAcceptController } from "@modules/groups/infra/http/controllers/GroupStudentInviteAcceptController";
import { GroupStudentInviteDeclineController } from "@modules/groups/infra/http/controllers/GroupStudentInviteDeclineController";
import { GroupTeacherInviteAcceptController } from "@modules/groups/infra/http/controllers/GroupTeacherInviteAcceptController";
import { GroupTeacherInviteDeclineController } from "@modules/groups/infra/http/controllers/GroupTeacherInviteDeclineController";

// middlewares
import { ensureAuthenticated } from "@modules/users/infra/http/middlewares/ensureAuthenticated";

//routes
import { documentsRouter } from "@modules/groups/infra/http/routes/document.route";
import { monographiesRouter } from "@modules/groups/infra/http/routes/monograph.route";

const groupsRouter = Router();
const upload = multer(uploadConfig.multer);

const uploadFields = [
  { name: "documentFile", maxCount: 1 },
  { name: "monographFile", maxCount: 1 },
];

const groupsController = new GroupsController();
const groupStudentInviteAcceptController =
  new GroupStudentInviteAcceptController();
const groupStudentInviteDeclineController =
  new GroupStudentInviteDeclineController();
const groupTeacherInviteAcceptController =
  new GroupTeacherInviteAcceptController();
const groupTeacherInviteDeclineController =
  new GroupTeacherInviteDeclineController();

groupsRouter.use("/document", documentsRouter);
groupsRouter.use("/monograph", monographiesRouter);

groupsRouter.post(
  "/",
  ensureAuthenticated,
  upload.fields(uploadFields),
  groupsController.store,
);
groupsRouter.get("/:id", ensureAuthenticated, groupsController.show);

groupsRouter.post(
  "/students/:inviteId/invite",
  ensureAuthenticated,
  groupStudentInviteAcceptController.store,
);
groupsRouter.post(
  "/students/:inviteId/decline",
  ensureAuthenticated,
  groupStudentInviteDeclineController.store,
);
groupsRouter.post(
  "/teachers/:inviteId/invite",
  ensureAuthenticated,
  groupTeacherInviteAcceptController.store,
);
groupsRouter.post(
  "/teachers/:inviteId/decline",
  ensureAuthenticated,
  groupTeacherInviteDeclineController.store,
);

export { groupsRouter };
