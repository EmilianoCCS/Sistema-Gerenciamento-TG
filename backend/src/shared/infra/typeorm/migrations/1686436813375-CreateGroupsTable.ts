import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGroupsTable1686436813375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "groups",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "theme",
            type: "varchar",
          },
          {
            name: "summary",
            type: "varchar",
          },
          {
            name: "teacher_id",
            type: "uuid",
          },
          {
            name: "document_url",
            type: "varchar",
            isNullable: true,
            default: null,
          },
          {
            name: "monography_url",
            type: "varchar",
            isNullable: true,
            default: null,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKGroupsTeachers",
            referencedTableName: "teachers",
            referencedColumnNames: ["id"],
            columnNames: ["teacher_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("groups");
  }
}
