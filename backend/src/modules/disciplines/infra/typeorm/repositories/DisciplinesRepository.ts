import { In, Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateDisciplineDTO } from "@modules/disciplines/dtos/ICreateDisciplineDTO";

// repositories
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";

// entities
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

export class DisciplinesRepository implements IDisciplinesRepository {
  private repository: Repository<DisciplineEntity>;

  constructor() {
    this.repository = dataSource.getRepository(DisciplineEntity);
  }

  public async findById(id: string): Promise<DisciplineEntity | null> {
    const discipline = await this.repository.findOne({
      where: { id },
    });

    return discipline;
  }

  public async findByName(name: string): Promise<DisciplineEntity | null> {
    const discipline = await this.repository.findOne({
      where: { name },
    });

    return discipline;
  }

  public async findByIds(ids: string[]): Promise<DisciplineEntity[]> {
    const disciplines = await this.repository.find({
      where: {
        id: In(ids),
      },
    });

    return disciplines;
  }

  public async findAll(): Promise<DisciplineEntity[]> {
    const disciplines = await this.repository.find();

    return disciplines;
  }

  public async create(data: ICreateDisciplineDTO): Promise<DisciplineEntity> {
    const discipline = this.repository.create(data);

    await this.repository.save(discipline);

    return discipline;
  }

  public async update(discipline: DisciplineEntity): Promise<DisciplineEntity> {
    return this.repository.save(discipline);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
