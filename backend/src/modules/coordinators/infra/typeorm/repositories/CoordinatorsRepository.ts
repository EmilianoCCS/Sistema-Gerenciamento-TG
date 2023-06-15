import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateTeacherDTO } from "@modules/teachers/dtos/ICreateTeacherDTO";

// repositories

import { ICoordinatorsRepository } from "@modules/coordinators/repositories/ICoordinatorsRepository";

// entities
import { CoordinatorEntity } from "@modules/coordinators/infra/typeorm/entities/CoordinatorEntity";

export class CoordinatorsRepository implements ICoordinatorsRepository {
  private repository: Repository<CoordinatorEntity>;

  constructor() {
    this.repository = dataSource.getRepository(CoordinatorEntity);
  }

  public async create({
    user,
    school,
  }: ICreateTeacherDTO): Promise<CoordinatorEntity> {
    const coordinator = this.repository.create({
      user,
      school,
    });

    await this.repository.save(coordinator);

    return coordinator;
  }

  public async findByUserId(id: string): Promise<CoordinatorEntity | null> {
    const coordinator = await this.repository.findOne({
      where: {
        userId: id,
      },
      relations: ["user", "school"],
    });

    return coordinator;
  }
}
