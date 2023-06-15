import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

// entities
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";

export class CoursesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const disciplinesRepository = dataSource.getRepository(DisciplineEntity);
    const coursesRepository = dataSource.getRepository(CourseEntity);
    const schoolsRepository = dataSource.getRepository(SchoolEntity);

    const schools: SchoolEntity[] = [];

    const school = await schoolsRepository.findOne({
      where: { name: "FATEC - Arthur de Azevedo" },
    });

    if (!school || !school.id) {
      return;
    }

    schools.push(school);

    const disciplines: DisciplineEntity[] = [];

    const discipline1 = await disciplinesRepository.findOne({
      where: { name: "Trabalho de Graduação I" },
    });

    if (discipline1) {
      disciplines.push(discipline1);
    }

    const discipline2 = await disciplinesRepository.findOne({
      where: { name: "Trabalho de Graduação II" },
    });

    if (discipline2) {
      disciplines.push(discipline2);
    }

    const courses: CourseEntity[] = [
      {
        name: "Análise e Desenvolvimento de Sistemas",
        schools,
        disciplines,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mecatrônica Industrial",
        schools,
        disciplines,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const course of courses) {
      const findCourse = await coursesRepository.findOne({
        where: { name: course.name },
      });

      if (findCourse) {
        return;
      }

      const newCourse = coursesRepository.create(course);

      await coursesRepository.save(newCourse);
    }
  }
}
