import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { CreateScheduleService } from "@modules/schedules/services/CreateScheduleService";

export class SchedulesController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { date, hour, group_id, examinerIds } = request.body;

    const createSchedule = container.resolve(CreateScheduleService);

    const { schedule } = await createSchedule.execute({
      date,
      hour,
      group_id,
      examinerIds,
    });

    return response.status(201).json({
      schedule: instanceToPlain(schedule),
    });
  }
}
