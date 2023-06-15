import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { CreateCoordinatorService } from "@modules/coordinators/services/CreateCoordinatorService";

export class CoordinatorsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { fullName, displayName, email, schoolId } = request.body;

    const createCoordinator = container.resolve(CreateCoordinatorService);

    const { coordinator } = await createCoordinator.execute({
      fullName,
      displayName,
      email,
      schoolId,
    });

    return response.status(201).json({
      coordinator: instanceToPlain(coordinator),
    });
  }
}
