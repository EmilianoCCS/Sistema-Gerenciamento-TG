import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateStudentsGroupsTable1686836469996
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "students_groups",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "student_id",
            type: "uuid",
          },
          {
            name: "group_id",
            type: "uuid",
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("students_groups", [
      new TableForeignKey({
        columnNames: ["student_id"],
        referencedTableName: "students",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["group_id"],
        referencedTableName: "groups",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("students_groups", "group_id");
    await queryRunner.dropForeignKey("students_groups", "student_id");

    await queryRunner.dropTable("students_groups");
  }
}
