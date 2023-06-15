import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListDisciplinesService } from "@modules/disciplines/services/ListDisciplinesService";
import { CreateDisciplineService } from "@modules/disciplines/services/CreateDisciplineService";
import { ShowDisciplinesService } from "@modules/disciplines/services/ShowDisciplineService";
import { UpdateDisciplineService } from "@modules/disciplines/services/UpdateDisciplineService";
import { DeleteDisciplineService } from "@modules/disciplines/services/DeleteDisciplineService";

export class DisciplinesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDisciplinesService = container.resolve(ListDisciplinesService);

    const { disciplines } = await listDisciplinesService.execute();

    return response.json({
      disciplines: instanceToPlain(disciplines),
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createDiscipline = container.resolve(CreateDisciplineService);

    const { discipline } = await createDiscipline.execute({
      name,
    });

    return response.status(201).json({
      discipline: instanceToPlain(discipline),
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };

    const showDisciplines = container.resolve(ShowDisciplinesService);

    const { discipline } = await showDisciplines.execute({
      id,
    });

    return response.status(200).json({
      discipline: instanceToPlain(discipline),
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };
    const { name } = request.body;

    const updateDiscipline = container.resolve(UpdateDisciplineService);

    const { discipline } = await updateDiscipline.execute({
      id,
      name,
    });

    return response.status(200).json({
      discipline: instanceToPlain(discipline),
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };

    const deleteDiscipline = container.resolve(DeleteDisciplineService);

    await deleteDiscipline.execute({
      id,
    });

    return response.status(204).end();
  }
}
