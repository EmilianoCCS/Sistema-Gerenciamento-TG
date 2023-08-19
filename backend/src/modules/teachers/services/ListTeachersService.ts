import { injectable, inject } from "tsyringe";

// repositories
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";

// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";

interface IRequest {
  page: number;
  limit: number;
  isActivated: boolean;
}

interface IResponse {
  teachers: TeacherEntity[];
}

@injectable()
export class ListTeachersService {
  constructor(
    // @ts-ignore
    @inject("TeachersRepository")
    private readonly teachersRepository: ITeachersRepository,
  ) {}

  public async execute({
    limit,
    page,
    isActivated,
  }: IRequest): Promise<IResponse> {
    const teachers = await this.teachersRepository.paginate({
      page,
      limit,
      isActivated,
    });

    return {
      teachers,
    };
  }
}
