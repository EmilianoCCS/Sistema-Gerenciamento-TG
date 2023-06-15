import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListPermissionsService } from "@modules/permissions/services/ListPermissionsService";
import { CreatePermissionService } from "@modules/permissions/services/CreatePermissionService";
import { ShowPermissionService } from "@modules/permissions/services/ShowPermissionService";
import { UpdatePermissionService } from "@modules/permissions/services/UpdatePermissionService";
import { DeletePermissionService } from "@modules/permissions/services/DeletePermissionService";

export class PermissionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPermissions = container.resolve(ListPermissionsService);

    const { permissions } = await listPermissions.execute();

    return response.status(200).json({
      permissions: instanceToPlain(permissions),
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createPermission = container.resolve(CreatePermissionService);

    const { permission } = await createPermission.execute({
      name,
      description,
    });

    return response.status(201).json({
      permission: instanceToPlain(permission),
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };

    const showPermission = container.resolve(ShowPermissionService);

    const { permission } = await showPermission.execute({
      id,
    });

    return response.status(200).json({
      permission: instanceToPlain(permission),
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };
    const { name, description } = request.body;

    const updatePermission = container.resolve(UpdatePermissionService);

    const { permission } = await updatePermission.execute({
      id,
      name,
      description,
    });

    return response.status(200).json({
      permission: instanceToPlain(permission),
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };

    const deletePermission = container.resolve(DeletePermissionService);

    await deletePermission.execute({
      id,
    });

    return response.status(204).end();
  }
}
