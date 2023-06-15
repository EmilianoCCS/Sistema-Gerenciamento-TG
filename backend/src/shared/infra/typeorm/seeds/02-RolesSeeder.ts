import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

// entities
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

export class RolesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const rolesRepository = dataSource.getRepository(RoleEntity);

    const rolesData: RoleEntity[] = [
      {
        name: "admin",
        description: "Administrador",
        permissions: [],
        users: [],
      },
      {
        name: "student",
        description: "Aluno",
        permissions: [],
        users: [],
      },
      {
        name: "teacher",
        description: "Professor",
        permissions: [],
        users: [],
      },
      {
        name: "coordinator",
        description: "Coordenador",
        permissions: [],
        users: [],
      },
    ];

    for (const role of rolesData) {
      const findRole = await rolesRepository.findOne({
        where: { name: role.name },
      });

      if (findRole) {
        return;
      }

      const newRole = rolesRepository.create(role);

      await rolesRepository.save(newRole);
    }
  }
}
