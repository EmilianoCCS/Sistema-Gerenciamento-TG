import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSchoolsCoursesTable1686093641836
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "schools_courses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "school_id",
            type: "uuid",
          },
          {
            name: "course_id",
            type: "uuid",
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("schools_courses", [
      new TableForeignKey({
        columnNames: ["school_id"],
        referencedTableName: "schools",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["course_id"],
        referencedTableName: "courses",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("schools_courses", "course_id");
    await queryRunner.dropForeignKey("schools_courses", "school_id");

    await queryRunner.dropTable("schools_courses");
  }
}
