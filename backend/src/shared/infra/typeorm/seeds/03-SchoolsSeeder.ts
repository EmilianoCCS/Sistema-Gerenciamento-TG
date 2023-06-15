import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

// entities
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";

export class SchoolsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const schoolsRepository = dataSource.getRepository(SchoolEntity);

    const school: SchoolEntity = {
      name: "FATEC - Arthur de Azevedo",
      courses: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const findSchool = await schoolsRepository.findOne({
      where: { name: school.name },
    });

    if (findSchool) {
      return;
    }

    const newSchool = schoolsRepository.create(school);

    await schoolsRepository.save(newSchool);
  }
}
