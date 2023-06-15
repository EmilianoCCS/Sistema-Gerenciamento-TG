import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateGroupTeacherInvitesTable1686519514099
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "group_teacher_invites",
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
            name: "teacher_id",
            type: "uuid",
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("group_teacher_invites", [
      new TableForeignKey({
        columnNames: ["group_id"],
        referencedTableName: "groups",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["teacher_id"],
        referencedTableName: "teachers",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("group_teacher_invites", "teacher_id");
    await queryRunner.dropForeignKey("group_teacher_invites", "group_id");

    await queryRunner.dropTable("group_teacher_invites");
  }
}
