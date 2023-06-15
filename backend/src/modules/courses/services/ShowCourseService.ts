import { inject, injectable } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

// entities
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

interface IRequest {
  id: string;
}

interface IResponse {
  course: CourseEntity;
}

@injectable()
export class ShowCourseService {
  constructor(
    // @ts-ignore
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const findCourse = await this.coursesRepository.findById(id);

    if (!findCourse) {
      throw new AppError(MessagesHelper.COURSE_NOT_FOUND, 404);
    }

    return {
      course: findCourse,
    };
  }
}
