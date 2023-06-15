import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

interface IRequest {
  id: string;
}

@injectable()
export class DeleteCourseService {
  constructor(
    // @ts-ignore
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const findCourse = await this.coursesRepository.findById(id);

    if (!findCourse || !findCourse.id) {
      throw new AppError(MessagesHelper.SCHOOL_NOT_FOUND, 404);
    }

    await this.coursesRepository.delete(findCourse.id);
  }
}
