import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListRolesService } from "@modules/roles/services/ListRolesService";
import { CreateRoleService } from "@modules/roles/services/CreateRoleService";
import { ShowRoleService } from "@modules/roles/services/ShowRoleService";
import { UpdateRoleService } from "@modules/roles/services/UpdateRoleService";
import { DeleteRoleService } from "@modules/roles/services/DeleteRoleService";

export class RolesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRoles = container.resolve(ListRolesService);

    const { roles } = await listRoles.execute();

    return response.status(200).json({
      roles: instanceToPlain(roles),
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, description, permissionIds } = request.body;

    const createRole = container.resolve(CreateRoleService);

    const { role } = await createRole.execute({
      name,
      description,
      permissionIds,
    });

    return response.status(201).json({
      role: instanceToPlain(role),
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };

    const showRole = container.resolve(ShowRoleService);

    const { role } = await showRole.execute({
      id,
    });

    return response.status(200).json({
      role: instanceToPlain(role),
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };
    const { name, description, permissionIds } = request.body;

    const updateRole = container.resolve(UpdateRoleService);

    const { role } = await updateRole.execute({
      id,
      name,
      description,
      permissionIds,
    });

    return response.status(200).json({
      role: instanceToPlain(role),
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };

    const deleteRole = container.resolve(DeleteRoleService);

    await deleteRole.execute({
      id,
    });

    return response.status(204).end();
  }
}
