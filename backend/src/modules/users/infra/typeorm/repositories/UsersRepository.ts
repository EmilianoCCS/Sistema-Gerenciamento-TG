import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IPaginateUsersDTO } from "@modules/users/dtos/IPaginateUsersDTO";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = dataSource.getRepository(UserEntity);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ["roles", "roles.permissions"],
      withDeleted: true,
    });

    return user;
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ["roles", "roles.permissions"],
      withDeleted: true,
    });

    return user;
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.repository.find({
      relations: ["roles", "roles.permissions"],
    });

    return users;
  }

  public async paginate({
    page,
    limite,
  }: IPaginateUsersDTO): Promise<UserEntity[]> {
    const users = await this.repository.find({
      skip: (page - 1) * limite,
      take: limite,
      relations: ["roles", "roles.permissions"],
    });

    return users;
  }

  public async create(data: ICreateUserDTO): Promise<UserEntity> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }

  public async update(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
