import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { join } from "node:path";

import { ManagerSeeder } from "./seeds/00-ManagerSeeder";

const port = process.env.DATABASE_PORT as number | undefined;

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: port,
  username: process.env.DATABASE_USER || "docker",
  password: process.env.DATABASE_PASSWORD || "docker",
  database: process.env.DATABASE_NAME || "docker",
  entities: [
    join(
      __dirname,
      "..",
      "..",
      "..",
      "modules",
      "**",
      "infra",
      "typeorm",
      "entities",
      "*.{js,ts}",
    ),
  ],
  migrations: [
    join(
      __dirname,
      "..",
      "..",
      "..",
      "shared",
      "infra",
      "typeorm",
      "migrations",
      "*.{js,ts}",
    ),
  ],
  seeds: [ManagerSeeder],
  synchronize: false,
  logging: false,
  uuidExtension: "uuid-ossp",
};

export const dataSource = new DataSource(options);
