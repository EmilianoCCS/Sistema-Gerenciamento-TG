import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1684785953444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "full_name",
            type: "varchar",
            isNullable: true,
            default: null,
          },
          {
            name: "display_name",
            type: "varchar",
            isNullable: true,
            default: null,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "secondary_email",
            type: "varchar",
            isNullable: true,
            default: null,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "avatar_url",
            type: "varchar",
            isNullable: true,
            default: null,
          },
          {
            name: "phone",
            type: "varchar",
            isNullable: true,
            default: null,
          },
          {
            name: "is_whatsapp",
            type: "boolean",
            default: false,
          },
          {
            name: "is_phone_visible",
            type: "boolean",
            default: false,
          },
          {
            name: "is_email_verified",
            type: "boolean",
            default: false,
          },
          {
            name: "is_profile_completed",
            type: "boolean",
            default: false,
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
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
