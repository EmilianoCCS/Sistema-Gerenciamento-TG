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
  name: string;
}

interface IResponse {
  discipline: DisciplineEntity;
}

@injectable()
export class CreateDisciplineService {
  constructor(
    // @ts-ignore
    @inject("DisciplinesRepository")
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<IResponse> {
    const disciplineAlreadyExists = await this.disciplinesRepository.findByName(
      name,
    );

    if (disciplineAlreadyExists) {
      throw new AppError(MessagesHelper.DISCIPLINE_ALREADY_EXISTS, 409);
    }

    const discipline = await this.disciplinesRepository.create({
      name,
    });

    return { discipline };
  }
}
