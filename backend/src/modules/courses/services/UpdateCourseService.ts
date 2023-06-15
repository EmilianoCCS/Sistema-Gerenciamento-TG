import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";
import { ICoursesDisciplinesRepository } from "@modules/courses/repositories/ICoursesDisciplinesRepository";

// entities
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

interface IRequest {
  id: string;
  name?: string;
  disciplineIds?: string[];
}

interface IResponse {
  course: CourseEntity;
}

@injectable()
export class UpdateCourseService {
  constructor(
    // @ts-ignore
    @inject("CoursesRepository")
    private readonly coursesRepository: ICoursesRepository,

    // @ts-ignore
    @inject("DisciplinesRepository")
    private readonly disciplinesRepository: IDisciplinesRepository,

    // @ts-ignore
    @inject("CoursesDisciplinesRepository")
    private readonly coursesDisciplinesRepository: ICoursesDisciplinesRepository,
  ) {}

  public async execute({
    id,
    name,
    disciplineIds,
  }: IRequest): Promise<IResponse> {
    const findCourse = await this.coursesRepository.findById(id);

    if (!findCourse) {
      throw new AppError(MessagesHelper.COURSE_NOT_FOUND, 404);
    }

    if (name) {
      findCourse.name = name;
    }

    const courseDisciplineIds = findCourse.disciplines.map(
      (discipline) => discipline.id!,
    );

    await this.coursesDisciplinesRepository.deleteByDisciplineIds(
      courseDisciplineIds,
    );

    let disciplines: DisciplineEntity[] = [];

    if (disciplineIds && disciplineIds.length > 0) {
      disciplines = await this.disciplinesRepository.findByIds(disciplineIds);
    }

    findCourse.disciplines = disciplines;

    const updatedCourse = await this.coursesRepository.update(findCourse);

    return {
      course: updatedCourse,
    };
  }
}
