// dtos
import { ICreateScheduleDTO } from "@modules/schedules/dtos/ICreateScheduleDTO";

// entities
import { ScheduleEntity } from "@modules/schedules/infra/typeorm/entities/ScheduleEntity";

export interface ISchedulesRepository {
  create(data: ICreateScheduleDTO): Promise<ScheduleEntity>;
}
