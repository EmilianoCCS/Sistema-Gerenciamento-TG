import { inject, injectable } from "tsyringe";

// repositories
import { ISchoolsRepository } from "@modules/schools/repositories/ISchoolsRepository";

// entities
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";

interface IResponse {
  schools: SchoolEntity[];
}

@injectable()
export class ListSchoolsService {
  constructor(
    // @ts-ignore
    @inject("SchoolsRepository")
    private schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const schools = await this.schoolsRepository.findAll();

    return { schools };
  }
}
