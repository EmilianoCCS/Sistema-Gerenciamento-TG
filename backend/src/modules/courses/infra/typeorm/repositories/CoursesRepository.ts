import { In, Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// repositories
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

// entities
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";
import { ICreateCourseDTO } from "@modules/courses/dtos/ICreateCourseDTO";

export class CoursesRepository implements ICoursesRepository {
  private repository: Repository<CourseEntity>;

  constructor() {
    this.repository = dataSource.getRepository(CourseEntity);
  }

  public async findByName(name: string): Promise<CourseEntity | null> {
    const course = await this.repository.findOne({
      where: { name },
      relations: ["disciplines"],
    });

    return course;
  }

  public async findById(id: string): Promise<CourseEntity | null> {
    const course = await this.repository.findOne({
      where: { id },
      relations: ["disciplines"],
    });

    return course;
  }

  public async findByIds(ids: string[]): Promise<CourseEntity[]> {
    const courses = await this.repository.find({
      where: {
        id: In(ids),
      },
      relations: ["disciplines"],
    });

    return courses;
  }

  public async findAll(): Promise<CourseEntity[]> {
    const courses = await this.repository.find({
      relations: ["disciplines"],
    });

    return courses;
  }

  public async create(data: ICreateCourseDTO): Promise<CourseEntity> {
    const course = this.repository.create(data);

    await this.repository.save(course);

    return course;
  }

  public async update(course: CourseEntity): Promise<CourseEntity> {
    await this.repository.save(course);

    return course;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
