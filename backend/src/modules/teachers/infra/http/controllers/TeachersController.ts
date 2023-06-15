import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListTeachersService } from "@modules/teachers/services/ListTeachersService";
import { CreateTeacherService } from "@modules/teachers/services/CreateTeacherService";
import { ShowTeacherService } from "@modules/teachers/services/ShowTeacherService";

export class TeachersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTeachers = container.resolve(ListTeachersService);

    const { teachers } = await listTeachers.execute();

    return response.status(200).json({
      teachers: instanceToPlain(teachers),
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { fullName, displayName, email, schoolId } = request.body;

    const createTeacher = container.resolve(CreateTeacherService);

    const { teacher } = await createTeacher.execute({
      fullName,
      displayName,
      email,
      schoolId,
    });

    return response.status(201).json({
      teacher: instanceToPlain(teacher),
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };

    const showTeacher = container.resolve(ShowTeacherService);

    const { teacher } = await showTeacher.execute({ id });

    return response.status(200).json({
      teacher: instanceToPlain(teacher),
    });
  }
}
