import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { UpdateMonographFileService } from "@modules/groups/services/UpdateMonographFileService";

export class UploadMonographFileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const { filename } = request.file as Express.Multer.File;

    const updateMonographFile = container.resolve(UpdateMonographFileService);

    const { group } = await updateMonographFile.execute({
      id,
      monographFilename: filename,
    });

    return response.json({
      group: instanceToPlain(group),
    });
  }
}
