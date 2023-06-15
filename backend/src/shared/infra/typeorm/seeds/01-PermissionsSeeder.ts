import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class PermissionsSeeder implements Seeder {
  public async run(_: DataSource, __: SeederFactoryManager): Promise<void> {
    throw new Error("Not implemented");
  }
}
