import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListSchoolsService } from "@modules/schools/services/ListSchoolsService";
import { CreateSchoolService } from "@modules/schools/services/CreateSchoolService";
import { ShowSchoolService } from "@modules/schools/services/ShowSchoolService";
import { UpdateSchoolService } from "@modules/schools/services/UpdateSchoolService";
import { DeleteSchoolService } from "@modules/schools/services/DeleteSchoolService";

export class SchoolsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSchools = container.resolve(ListSchoolsService);

    const { schools } = await listSchools.execute();

    return response.status(200).json({
      schools: instanceToPlain(schools),
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, courseIds } = request.body;

    const createSchool = container.resolve(CreateSchoolService);

    const { school } = await createSchool.execute({
      name,
      courseIds,
    });

    return response.status(201).json({
      school: instanceToPlain(school),
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSchool = container.resolve(ShowSchoolService);

    const { school } = await showSchool.execute({ id });

    return response.status(200).json({
      school: instanceToPlain(school),
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, courseIds } = request.body;

    const updateSchool = container.resolve(UpdateSchoolService);

    const { school } = await updateSchool.execute({
      id,
      name,
      courseIds,
    });

    return response.status(200).json({
      school: instanceToPlain(school),
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSchool = container.resolve(DeleteSchoolService);

    await deleteSchool.execute({ id });

    return response.status(204).end();
  }
}
