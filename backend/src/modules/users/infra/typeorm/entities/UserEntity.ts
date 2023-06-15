import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Exclude, Expose } from "class-transformer";

// config
import uploadConfig from "@config/upload";

// entities
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "full_name",
    type: "varchar",
    nullable: true,
  })
  fullName!: string;

  @Column({
    name: "display_name",
    type: "varchar",
    nullable: true,
  })
  displayName!: string;

  @Column({
    type: "varchar",
  })
  email!: string;

  @Column({
    name: "secondary_email",
    type: "varchar",
    nullable: true,
  })
  secondaryEmail!: string | null;

  @Column({
    type: "varchar",
  })
  @Exclude()
  password!: string;

  @Column({
    name: "avatar_url",
    type: "varchar",
    nullable: true,
  })
  avatarUrl!: string | null;

  @Column({
    name: "phone",
    type: "varchar",
    nullable: true,
  })
  phone!: string | null;

  @Column({
    name: "is_whatsapp",
    type: "boolean",
    default: false,
  })
  isWhatsapp!: boolean;

  @Column({
    name: "is_phone_visible",
    type: "boolean",
    default: false,
  })
  isPhoneVisible!: boolean;

  @Column({
    name: "is_email_verified",
    type: "boolean",
    default: false,
  })
  isEmailVerified!: boolean;

  @Column({
    name: "is_profile_completed",
    type: "boolean",
    default: false,
  })
  isProfileCompleted!: boolean;

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "role_id", referencedColumnName: "id" }],
  })
  @Exclude()
  roles!: RoleEntity[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Exclude()
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  @Exclude()
  deleteAt!: Date | null;

  @Expose({ name: "avatar_url" })
  getAvatarUrl?(): string | null {
    if (!this.avatarUrl) {
      return null;
    }

    switch (uploadConfig.driver) {
      case "disk":
        return `${process.env.APP_API_URL}/files/${this.avatarUrl}`;
      case "s3":
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatarUrl}`;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
