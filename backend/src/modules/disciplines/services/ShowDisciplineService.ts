import { inject, injectable } from "tsyringe";

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
}

interface IResponse {
  discipline: DisciplineEntity;
}

@injectable()
export class ShowDisciplinesService {
  constructor(
    // @ts-ignore
    @inject("DisciplinesRepository")
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const findDiscipline = await this.disciplinesRepository.findById(id);

    if (!findDiscipline) {
      throw new AppError(MessagesHelper.DISCIPLINE_NOT_FOUND, 404);
    }

    return {
      discipline: findDiscipline,
    };
  }
}
