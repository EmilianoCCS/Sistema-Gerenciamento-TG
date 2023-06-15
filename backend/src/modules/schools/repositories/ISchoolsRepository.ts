// dtos
import { ICreateSchoolDTO } from "@modules/schools/dtos/ICreateSchoolDTO";

// entities
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";

export interface ISchoolsRepository {
  findById(id: string): Promise<SchoolEntity | null>;
  findByName(name: string): Promise<SchoolEntity | null>;
  findAll(): Promise<SchoolEntity[]>;
  create(data: ICreateSchoolDTO): Promise<SchoolEntity>;
  update(school: SchoolEntity): Promise<SchoolEntity>;
  delete(id: string): Promise<void>;
}
