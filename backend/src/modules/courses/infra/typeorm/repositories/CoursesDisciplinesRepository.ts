import { In, Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// repositories
import { ICoursesDisciplinesRepository } from "@modules/courses/repositories/ICoursesDisciplinesRepository";

// entities
import { CourseDisciplineEntity } from "@modules/courses/infra/typeorm/entities/CourseDisciplineEntity";

export class CoursesDisciplinesRepository
  implements ICoursesDisciplinesRepository
{
  private repository: Repository<CourseDisciplineEntity>;

  constructor() {
    this.repository = dataSource.getRepository(CourseDisciplineEntity);
  }

  public async create(
    courseId: string,
    disciplineIds: string[],
  ): Promise<void> {
    const coursesDisciplines = disciplineIds.map((disciplineId) =>
      this.repository.create({
        courseId,
        disciplineId,
      }),
    );

    await this.repository.save(coursesDisciplines);
  }

  public async deleteByDisciplineIds(disciplineIds: string[]): Promise<void> {
    await this.repository.delete({
      disciplineId: In(disciplineIds),
    });
  }
}
