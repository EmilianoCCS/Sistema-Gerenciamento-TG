import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListGroupsService } from "@modules/groups/services/ListGroupsService";
import { CreateGroupService } from "@modules/groups/services/CreateGroupService";
import { ShowGroupService } from "@modules/groups/services/ShowGroupService";

export class GroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listGroups = container.resolve(ListGroupsService);

    const { groups } = await listGroups.execute();

    return response.status(200).json({
      groups: instanceToPlain(groups),
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { emails, theme, summary, justifications, teacherId } = request.body;
    const { id } = request.user;
    const files = request.files as Express.Multer.File[];

    const documentFile = files["documentFile"][0] as Express.Multer.File;

    const createGroup = container.resolve(CreateGroupService);

    const { group } = await createGroup.execute({
      id,
      emails: JSON.parse(emails),
      theme,
      summary,
      justifications: JSON.parse(justifications),
      teacherId: teacherId.replaceAll('"', ""),
      documentFilename: documentFile.filename,
      monographFilename: files["monographFile"]
        ? files["monographFile"][0].filename
        : undefined,
    });

    return response.status(201).json({
      group: instanceToPlain(group),
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };

    const showGroup = container.resolve(ShowGroupService);

    const { group } = await showGroup.execute({
      id,
    });

    return response.status(200).json({
      group: instanceToPlain(group),
    });
  }
}
