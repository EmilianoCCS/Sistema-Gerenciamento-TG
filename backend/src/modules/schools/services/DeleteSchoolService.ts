import { inject, injectable } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ISchoolsRepository } from "@modules/schools/repositories/ISchoolsRepository";

interface IRequest {
  id: string;
}

@injectable()
export class DeleteSchoolService {
  constructor(
    // @ts-ignore
    @inject("SchoolsRepository")
    private schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const findSchool = await this.schoolsRepository.findById(id);

    if (!findSchool || !findSchool.id) {
      throw new AppError(MessagesHelper.SCHOOL_NOT_FOUND, 404);
    }

    await this.schoolsRepository.delete(findSchool.id);
  }
}
