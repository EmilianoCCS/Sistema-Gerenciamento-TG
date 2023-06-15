import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListUsersService } from "@modules/users/services/ListUsersService";
import { CreateUserService } from "@modules/users/services/CreateUserService";
import { ShowUserService } from "@modules/users/services/ShowUserService";
import { UpdateUserService } from "@modules/users/services/UpdateUserService";
import { DeleteUserService } from "@modules/users/services/DeleteUserService";

export class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { page = 1, limit = 10 } = request.params;

    const listUsers = container.resolve(ListUsersService);

    const { users } = await listUsers.execute({
      page: Number(page),
      limite: Number(limit),
    });

    return response.status(200).json({
      users: instanceToPlain(users),
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { fullName, displayName, email, password, roleIds } = request.body;

    const createUser = container.resolve(CreateUserService);

    const { user, token, refreshToken } = await createUser.execute({
      fullName,
      displayName,
      email,
      password,
      roleIds,
    });

    return response.status(201).json({
      user: instanceToPlain(user),
      token,
      refreshToken,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.query as {
      id: string;
    };

    const showUser = container.resolve(ShowUserService);

    const { user } = await showUser.execute({ id });

    return response.status(200).json({ user: instanceToPlain(user) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.query as {
      id: string;
    };

    const { fullName, displayName, email } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const { user } = await updateUser.execute({
      id,
      fullName,
      displayName,
      email,
    });

    return response.status(200).json({
      user: instanceToPlain(user),
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query as {
      id: string;
    };

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ id });

    return response.status(204).end();
  }
}
