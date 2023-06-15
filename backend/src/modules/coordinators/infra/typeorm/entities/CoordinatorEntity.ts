import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuidV4 } from "uuid";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";

@Entity({ name: "coordinators" })
export class CoordinatorEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "user_id",
    type: "uuid",
  })
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @Column({
    name: "school_id",
    type: "uuid",
  })
  schoolId!: string;

  @ManyToOne(() => SchoolEntity)
  @JoinColumn({ name: "school_id" })
  school!: SchoolEntity;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Exclude()
  updatedAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
