import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateUserTokenDTO } from "@modules/users/dtos/ICreateUserTokenDTO";

// repositories
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";

// entities
import { UserTokenEntity } from "@modules/users/infra/typeorm/entities/UserTokenEntity";

export class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokenEntity>;

  constructor() {
    this.repository = dataSource.getRepository(UserTokenEntity);
  }

  async create({
    expiresDate,
    token,
    userId,
    tokenType,
  }: ICreateUserTokenDTO): Promise<UserTokenEntity> {
    const userToken = this.repository.create({
      expiresDate,
      token,
      userId,
      tokenType,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndToken(
    userId: string,
    token: string,
  ): Promise<UserTokenEntity | null> {
    const usersoken = await this.repository.findOne({
      where: {
        userId,
        token,
      },
    });

    return usersoken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteAllByUserIdAndTokenType(
    userId: string,
    tokenType: string,
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where({ userId, tokenType })
      .execute();
  }

  async findByToken(token: string): Promise<UserTokenEntity | null> {
    const userToken = await this.repository.findOne({
      where: { token },
    });

    return userToken;
  }
}
