// dtos
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IPaginateUsersDTO } from "@modules/users/dtos/IPaginateUsersDTO";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";

export interface IUsersRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  paginate(data: IPaginateUsersDTO): Promise<UserEntity[]>;
  create(data: ICreateUserDTO): Promise<UserEntity>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
