import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";

// entities
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

interface IRequest {
  id: string;
  name?: string;
}

interface IResponsse {
  discipline: DisciplineEntity;
}

@injectable()
export class UpdateDisciplineService {
  constructor(
    // @ts-ignore
    @inject("DisciplinesRepository")
    private readonly disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<IResponsse> {
    const findDiscipline = await this.disciplinesRepository.findById(id);

    if (!findDiscipline) {
      throw new AppError(MessagesHelper.DISCIPLINE_NOT_FOUND, 404);
    }

    if (name) {
      findDiscipline.name = name;
    }

    const updatedDiscipline = await this.disciplinesRepository.update(
      findDiscipline,
    );

    return {
      discipline: updatedDiscipline,
    };
  }
}
