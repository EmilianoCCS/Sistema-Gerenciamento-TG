import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSchedulesExaminersTable1687179271161
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "schedules_examiners",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "schedule_id",
            type: "uuid",
          },
          {
            name: "teacher_id",
            type: "uuid",
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("schedules_examiners", [
      new TableForeignKey({
        name: "FKSchedulesExaminersGroups",
        columnNames: ["schedule_id"],
        referencedTableName: "schedules",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        name: "FKSchedulesExaminersTeachers",
        columnNames: ["teacher_id"],
        referencedTableName: "groups",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("schedules_examiners", "teacher_id");
    await queryRunner.dropForeignKey("schedules_examiners", "schedule_id");

    await queryRunner.dropTable("schedules_examiners");
  }
}
