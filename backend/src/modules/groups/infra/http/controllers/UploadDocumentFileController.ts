import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { UpdateDocumentFileService } from "@modules/groups/services/UpdateDocumentFileService";

export class UploadDocumentFileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const { filename } = request.file as Express.Multer.File;

    const updateDocumentFile = container.resolve(UpdateDocumentFileService);

    const { group } = await updateDocumentFile.execute({
      id,
      documentFilename: filename,
    });

    return response.json({
      group: instanceToPlain(group),
    });
  }
}
