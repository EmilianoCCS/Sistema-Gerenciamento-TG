import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { hash } from "bcryptjs";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";
import { CoordinatorEntity } from "@modules/coordinators/infra/typeorm/entities/CoordinatorEntity";
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";

export class AdminSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const usersRepository = dataSource.getRepository(UserEntity);
    const rolesRes = dataSource.getRepository(RoleEntity);
    const coordinatorsRepository = dataSource.getRepository(CoordinatorEntity);
    const schoolsRepository = dataSource.getRepository(SchoolEntity);

    const roles: RoleEntity[] = [];

    const findAdminRole = await rolesRes.findOne({
      where: { name: "coordinator" },
    });

    if (findAdminRole) {
      roles.push(findAdminRole);
    }

    const password = "123456";

    const passwordHash = await hash(password, 8);

    const userData: UserEntity = {
      fullName: "Administrador",
      displayName: "Admin",
      email: "fatec.arthurdeazevedo@gmail.com",
      secondaryEmail: null,
      password: passwordHash,
      phone: null,
      isWhatsapp: false,
      isPhoneVisible: false,
      avatarUrl: null,
      isEmailVerified: true,
      isProfileCompleted: true,
      roles,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleteAt: null,
    };

    const findUser = await usersRepository.findOne({
      where: { email: userData.email },
    });

    if (findUser) {
      return;
    }

    const newUser = usersRepository.create(userData);

    await usersRepository.save(newUser);

    const findSchool = await schoolsRepository.findOne({
      where: { name: "FATEC - Arthur de Azevedo" },
    });

    const coordinator = coordinatorsRepository.create({
      user: newUser!,
      school: findSchool!,
    });

    await coordinatorsRepository.save(coordinator);
  }
}
