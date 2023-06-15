import { injectable, inject } from "tsyringe";

// repositories
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";

// entities
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

interface IResponse {
  disciplines: DisciplineEntity[];
}

@injectable()
export class ListDisciplinesService {
  constructor(
    // @ts-ignore
    @inject("DisciplinesRepository")
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const disciplines = await this.disciplinesRepository.findAll();

    return {
      disciplines,
    };
  }
}
