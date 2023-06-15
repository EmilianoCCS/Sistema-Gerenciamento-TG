// dtos
import { ICreateDisciplineDTO } from "@modules/disciplines/dtos/ICreateDisciplineDTO";

// entities
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

export interface IDisciplinesRepository {
  findById(id: string): Promise<DisciplineEntity | null>;
  findByName(name: string): Promise<DisciplineEntity | null>;
  findByIds(ids: string[]): Promise<DisciplineEntity[]>;
  findAll(): Promise<DisciplineEntity[]>;
  create(data: ICreateDisciplineDTO): Promise<DisciplineEntity>;
  update(discipline: DisciplineEntity): Promise<DisciplineEntity>;
  delete(id: string): Promise<void>;
}
