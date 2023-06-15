import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateJustificationDTO } from "@modules/groups/dtos/ICreateJustificationDTO";

// repositories
import { IJustificationsRepository } from "@modules/groups/repositories/IJustificationsRepository";

// entities
import { JustificationEntity } from "@modules/groups/infra/typeorm/entities/JustificationEntity";

export class JustificationsRepository implements IJustificationsRepository {
  private repository: Repository<JustificationEntity>;

  constructor() {
    this.repository = dataSource.getRepository(JustificationEntity);
  }

  public async create(
    data: ICreateJustificationDTO,
  ): Promise<JustificationEntity> {
    const justification = this.repository.create(data);

    await this.repository.save(justification);

    return justification;
  }
}
