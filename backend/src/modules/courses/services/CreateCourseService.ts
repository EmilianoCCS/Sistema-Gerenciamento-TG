import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";

// entities
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

interface IRequest {
  name: string;
  disciplineIds?: string[];
}

interface IResponse {
  course: CourseEntity;
}

@injectable()
export class CreateCourseService {
  constructor(
    // @ts-ignore
    @inject("CousesRepository")
    private cousesRepository: ICoursesRepository,

    // @ts-ignore
    @inject("DisciplinesRepository")
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute({ name, disciplineIds }: IRequest): Promise<IResponse> {
    const courseAlreadyExists = await this.cousesRepository.findByName(name);

    if (courseAlreadyExists) {
      throw new AppError(MessagesHelper.SCHOOL_ALREADY_EXISTS, 409);
    }

    const disciplines: DisciplineEntity[] = [];

    if (disciplineIds && !disciplineIds.length) {
      const disciplinesFound = await this.disciplinesRepository.findByIds(
        disciplineIds,
      );

      disciplines.push(...disciplinesFound);
    }

    const course = await this.cousesRepository.create({
      name,
      disciplines,
    });

    return { course };
  }
}
