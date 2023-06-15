import { injectable, inject } from "tsyringe";

// repositories
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

// entities
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

interface IResponse {
  courses: CourseEntity[];
}

@injectable()
export class ListCoursesService {
  constructor(
    // @ts-ignore
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const courses = await this.coursesRepository.findAll();

    return {
      courses,
    };
  }
}
