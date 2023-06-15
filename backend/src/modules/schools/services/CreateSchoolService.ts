import { inject, injectable } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ISchoolsRepository } from "@modules/schools/repositories/ISchoolsRepository";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

// entities
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

interface IRequest {
  name: string;
  courseIds?: string[];
}

interface IResponse {
  school: SchoolEntity;
}

@injectable()
export class CreateSchoolService {
  constructor(
    // @ts-ignore
    @inject("SchoolsRepository")
    private schoolsRepository: ISchoolsRepository,

    // @ts-ignore
    @inject("CousesRepository")
    private cousesRepository: ICoursesRepository,
  ) {}

  public async execute({ name, courseIds }: IRequest): Promise<IResponse> {
    const schoolAlreadyExists = await this.schoolsRepository.findByName(name);

    if (schoolAlreadyExists) {
      throw new AppError(MessagesHelper.SCHOOL_ALREADY_EXISTS, 409);
    }

    const courses: CourseEntity[] = [];

    if (courseIds && !courseIds.length) {
      const coursesFound = await this.cousesRepository.findByIds(courseIds);

      courses.push(...coursesFound);
    }

    const school = await this.schoolsRepository.create({
      name,
      courses,
    });

    return { school };
  }
}
