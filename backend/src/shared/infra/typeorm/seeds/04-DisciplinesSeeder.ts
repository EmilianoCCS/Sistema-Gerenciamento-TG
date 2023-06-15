import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

// entities
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

export class DisciplinesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const disciplinesRepository = dataSource.getRepository(DisciplineEntity);

    const disciplinesData: DisciplineEntity[] = [
      {
        name: "Trabalho de Graduação I",
        courses: [],
        students: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Trabalho de Graduação II",
        courses: [],
        students: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const discipline of disciplinesData) {
      const findDiscipline = await disciplinesRepository.findOne({
        where: { name: discipline.name },
      });

      if (findDiscipline) {
        return;
      }

      const newRole = disciplinesRepository.create(discipline);

      await disciplinesRepository.save(newRole);
    }
  }
}
