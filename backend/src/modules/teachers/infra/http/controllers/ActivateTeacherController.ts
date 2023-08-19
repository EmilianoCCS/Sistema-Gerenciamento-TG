import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ActivateTeacherService } from "@modules/teachers/services/ActivateTeacherService";

export class ActivateTeacherController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };

    const activateTeacher = container.resolve(ActivateTeacherService);

    const { teacher } = await activateTeacher.execute({
      id,
    });

    return response.status(201).json({
      teacher: instanceToPlain(teacher),
    });
  }
}
