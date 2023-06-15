// dtos
import { ICreateUserTokenDTO } from "@modules/users/dtos/ICreateUserTokenDTO";

// entities
import { UserTokenEntity } from "@modules/users/infra/typeorm/entities/UserTokenEntity";

export interface IUserTokensRepository {
  create({
    expiresDate,
    token,
    userId,
    tokenType,
  }: ICreateUserTokenDTO): Promise<UserTokenEntity>;

  findByUserIdAndToken(
    userId: string,
    Token: string,
  ): Promise<UserTokenEntity | null>;

  deleteById(id: string): Promise<void>;

  deleteAllByUserIdAndTokenType(
    userId: string,
    tokenType: string,
  ): Promise<void>;

  findByToken(token: string): Promise<UserTokenEntity | null>;
}
