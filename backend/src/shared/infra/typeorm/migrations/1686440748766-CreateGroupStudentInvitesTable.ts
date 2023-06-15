import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateGroupStudentInvitesTable1686440748766
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "group_student_invites",
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
            name: "student_id",
            type: "uuid",
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("group_student_invites", [
      new TableForeignKey({
        columnNames: ["group_id"],
        referencedTableName: "groups",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["student_id"],
        referencedTableName: "students",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("group_student_invites", "student_id");
    await queryRunner.dropForeignKey("group_student_invites", "group_id");

    await queryRunner.dropTable("group_student_invites");
  }
}
