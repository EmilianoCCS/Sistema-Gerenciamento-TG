import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { UserEntity } from "./UserEntity";

@Entity("user_tokens")
export class UserTokenEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "token",
    type: "varchar",
  })
  token!: string;

  @Column({
    name: "token_type",
    type: "varchar",
  })
  tokenType!: string;

  @Column({
    name: "user_id",
    type: "varchar",
  })
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @Column({
    name: "expires_date",
    type: "timestamp",
  })
  expiresDate!: Date;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
