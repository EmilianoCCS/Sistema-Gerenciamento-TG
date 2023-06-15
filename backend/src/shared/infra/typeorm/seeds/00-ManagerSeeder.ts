import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";

// import { PermissionsSeeder } from "./01-PermissionsSeeder";
import { RolesSeeder } from "./02-RolesSeeder";
import { SchoolsSeeder } from "./03-SchoolsSeeder";
import { DisciplinesSeeder } from "./04-DisciplinesSeeder";
import { CoursesSeeder } from "./05-CoursesSeeder";
import { AdminSeeder } from "./06-AdminSeeder";

export class ManagerSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    // await runSeeder(dataSource, PermissionsSeeder);
    await runSeeder(dataSource, RolesSeeder);
    await runSeeder(dataSource, SchoolsSeeder);
    await runSeeder(dataSource, DisciplinesSeeder);
    await runSeeder(dataSource, CoursesSeeder);
    await runSeeder(dataSource, AdminSeeder);
  }
}
