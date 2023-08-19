import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dros
import { ICreateScheduleDTO } from "@modules/schedules/dtos/ICreateScheduleDTO";

// repositories
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";

// entities
import { ScheduleEntity } from "@modules/schedules/infra/typeorm/entities/ScheduleEntity";

export class SchedulesRepository implements ISchedulesRepository {
  private repository: Repository<ScheduleEntity>;

  constructor() {
    this.repository = dataSource.getRepository(ScheduleEntity);
  }

  public async create(data: ICreateScheduleDTO): Promise<ScheduleEntity> {
    const schedule = this.repository.create(data);

    await this.repository.save(schedule);

    return schedule;
  }
}
