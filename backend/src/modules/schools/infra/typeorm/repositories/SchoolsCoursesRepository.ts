import { In, Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// repositories
import { ISchoolsCoursesRepository } from "@modules/schools/repositories/ISchoolsCoursesRepository";

// entities
import { SchoolCourseEntity } from "@modules/schools/infra/typeorm/entities/SchoolCourseEntity";

export class SchoolsCoursesRepository implements ISchoolsCoursesRepository {
  private repository: Repository<SchoolCourseEntity>;

  constructor() {
    this.repository = dataSource.getRepository(SchoolCourseEntity);
  }

  public async create(schoolId: string, courseIds: string[]): Promise<void> {
    const schoolsCourses = courseIds.map((courseId) =>
      this.repository.create({
        schoolId,
        courseId,
      }),
    );

    await this.repository.save(schoolsCourses);
  }

  public async deleteByCourseIds(courseIds: string[]): Promise<void> {
    await this.repository.delete({
      courseId: In(courseIds),
    });
  }
}
