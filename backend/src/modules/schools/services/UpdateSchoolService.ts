import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ISchoolsRepository } from "@modules/schools/repositories/ISchoolsRepository";
import { ISchoolsCoursesRepository } from "@modules/schools/repositories/ISchoolsCoursesRepository";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

// entities
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

interface IRequest {
  id: string;
  name?: string;
  courseIds?: string[];
}

interface IResponse {
  school: SchoolEntity;
}

@injectable()
export class UpdateSchoolService {
  constructor(
    // @ts-ignore
    @inject("SchoolsRepository")
    private readonly schoolsRepository: ISchoolsRepository,

    // @ts-ignore
    @inject("CoursesRepository")
    private readonly coursesRepository: ICoursesRepository,

    // @ts-ignore
    @inject("SchoolsCoursesRepository")
    private readonly schoolsCoursesRepository: ISchoolsCoursesRepository,
  ) {}

  public async execute({ id, name, courseIds }: IRequest): Promise<IResponse> {
    const findSchool = await this.schoolsRepository.findById(id);

    if (!findSchool) {
      throw new AppError(MessagesHelper.SCHOOL_NOT_FOUND, 404);
    }

    if (name) {
      findSchool.name = name;
    }

    const schoolCourseIds = findSchool.courses.map((course) => course.id!);

    await this.schoolsCoursesRepository.deleteByCourseIds(schoolCourseIds);

    let courses: CourseEntity[] = [];

    if (courseIds && courseIds.length > 0) {
      courses = await this.coursesRepository.findByIds(courseIds);
    }

    findSchool.courses = courses;

    const updatedSchool = await this.schoolsRepository.update(findSchool);

    return {
      school: updatedSchool,
    };
  }
}
