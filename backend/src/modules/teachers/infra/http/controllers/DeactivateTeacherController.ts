import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { DeactivateTeacherService } from "@modules/teachers/services/DeactivateTeacherService";

export class DeactivateTeacherController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as {
      id: string;
    };

    const deactivateTeacher = container.resolve(DeactivateTeacherService);

    const { teacher } = await deactivateTeacher.execute({
      id,
    });

    return response.status(201).json({
      teacher: instanceToPlain(teacher),
    });
  }
}
