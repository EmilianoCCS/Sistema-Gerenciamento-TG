import { injectable, inject } from "tsyringe";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";

interface IRequest {
  page: number;
  limite: number;
}

interface IResponse {
  users: UserEntity[];
}

@injectable()
export class ListUsersService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ page, limite }: IRequest): Promise<IResponse> {
    const users = await this.usersRepository.paginate({ page, limite });

    return {
      users,
    };
  }
}
