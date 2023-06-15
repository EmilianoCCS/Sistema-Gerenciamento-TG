import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTeachersGroupsTable1686704674188
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "teachers_groups",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "teacher_id",
            type: "uuid",
          },
          {
            name: "group_id",
            type: "uuid",
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("teachers_groups", [
      new TableForeignKey({
        columnNames: ["teacher_id"],
        referencedTableName: "teachers",
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
    await queryRunner.dropForeignKey("teachers_groups", "group_id");
    await queryRunner.dropForeignKey("teachers_groups", "teacher_id");

    await queryRunner.dropTable("teachers_groups");
  }
}
