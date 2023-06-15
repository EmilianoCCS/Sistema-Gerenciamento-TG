import { inject, injectable } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ISchoolsRepository } from "@modules/schools/repositories/ISchoolsRepository";

// entities
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";

interface IRequest {
  id: string;
}

interface IResponse {
  school: SchoolEntity;
}

@injectable()
export class ShowSchoolService {
  constructor(
    // @ts-ignore
    @inject("SchoolsRepository")
    private schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const findSchool = await this.schoolsRepository.findById(id);

    if (!findSchool) {
      throw new AppError(MessagesHelper.SCHOOL_NOT_FOUND, 404);
    }

    return {
      school: findSchool,
    };
  }
}
