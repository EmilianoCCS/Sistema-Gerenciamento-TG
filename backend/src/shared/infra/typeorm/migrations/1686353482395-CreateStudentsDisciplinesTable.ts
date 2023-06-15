import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateStudentsDisciplinesTable1686353482395
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "students_disciplines",
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
            name: "discipline_id",
            type: "uuid",
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("students_disciplines", [
      new TableForeignKey({
        columnNames: ["student_id"],
        referencedTableName: "students",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["discipline_id"],
        referencedTableName: "disciplines",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("students_disciplines", "discipline_id");
    await queryRunner.dropForeignKey("students_disciplines", "student_id");

    await queryRunner.dropTable("students_disciplines");
  }
}
