import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateGroupsJustificationsTable1686772703599
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "groups_justifications",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "group_id",
            type: "uuid",
          },
          {
            name: "justification_id",
            type: "uuid",
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("groups_justifications", [
      new TableForeignKey({
        columnNames: ["group_id"],
        referencedTableName: "groups",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["justification_id"],
        referencedTableName: "justifications",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("groups_justifications", "group_id");
    await queryRunner.dropForeignKey(
      "groups_justifications",
      "justification_id",
    );

    await queryRunner.dropTable("groups_justifications");
  }
}
