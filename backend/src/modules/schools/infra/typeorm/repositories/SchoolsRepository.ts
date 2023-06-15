import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateSchoolDTO } from "@modules/schools/dtos/ICreateSchoolDTO";

// repositories
import { ISchoolsRepository } from "@modules/schools/repositories/ISchoolsRepository";

// entities
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";

export class SchoolsRepository implements ISchoolsRepository {
  private repository: Repository<SchoolEntity>;

  constructor() {
    this.repository = dataSource.getRepository(SchoolEntity);
  }

  public async findById(id: string): Promise<SchoolEntity | null> {
    const school = await this.repository.findOne({
      where: { id },
      relations: ["courses", "courses.disciplines"],
    });

    return school;
  }

  public async findByName(name: string): Promise<SchoolEntity | null> {
    const school = await this.repository.findOne({
      where: { name },
      relations: ["courses", "courses.disciplines"],
    });

    return school;
  }

  public async findAll(): Promise<SchoolEntity[]> {
    const schools = await this.repository.find({
      relations: ["courses", "courses.disciplines"],
    });

    return schools;
  }

  public async create(data: ICreateSchoolDTO): Promise<SchoolEntity> {
    const school = this.repository.create(data);

    await this.repository.save(school);

    return school;
  }

  public async update(school: SchoolEntity): Promise<SchoolEntity> {
    return this.repository.save(school);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
