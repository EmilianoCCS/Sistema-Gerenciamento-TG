// dtos
import { ICreateCoordinatorDTO } from "@modules/coordinators/dtos/ICreateCoordinatorDTO";

// entities
import { CoordinatorEntity } from "@modules/coordinators/infra/typeorm/entities/CoordinatorEntity";

export interface ICoordinatorsRepository {
  create(data: ICreateCoordinatorDTO): Promise<CoordinatorEntity>;
  findByUserId(id: string): Promise<CoordinatorEntity | null>;
}
