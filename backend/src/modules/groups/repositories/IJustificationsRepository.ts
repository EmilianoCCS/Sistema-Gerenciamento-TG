// dtos
import { ICreateJustificationDTO } from "@modules/groups/dtos/ICreateJustificationDTO";

// entities
import { JustificationEntity } from "@modules/groups/infra/typeorm/entities/JustificationEntity";

export interface IJustificationsRepository {
  create(data: ICreateJustificationDTO): Promise<JustificationEntity>;
}
