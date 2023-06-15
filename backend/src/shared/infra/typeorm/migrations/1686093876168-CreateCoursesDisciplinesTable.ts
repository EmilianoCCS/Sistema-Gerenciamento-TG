import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCoursesDisciplinesTable1686093876168
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "courses_disciplines",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "course_id",
            type: "uuid",
          },
          {
            name: "discipline_id",
            type: "uuid",
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("courses_disciplines", [
      new TableForeignKey({
        columnNames: ["course_id"],
        referencedTableName: "courses",
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
    await queryRunner.dropForeignKey("courses_disciplines", "course_id");
    await queryRunner.dropForeignKey("courses_disciplines", "discipline_id");

    await queryRunner.dropTable("courses_disciplines");
  }
}
