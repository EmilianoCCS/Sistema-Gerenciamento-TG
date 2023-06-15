import { inject, injectable } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";

interface IRequest {
  id: string;
}

@injectable()
export class DeleteDisciplineService {
  constructor(
    // @ts-ignore
    @inject("DisciplinesRepository")
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const findDiscipline = await this.disciplinesRepository.findById(id);

    if (!findDiscipline || !findDiscipline.id) {
      throw new AppError(MessagesHelper.DISCIPLINE_NOT_FOUND, 404);
    }

    await this.disciplinesRepository.delete(findDiscipline.id);
  }
}
