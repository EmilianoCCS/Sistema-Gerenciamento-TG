import { injectable, inject } from "tsyringe";

// repositories
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";

// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";

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

  public async execute(): Promise<IResponse> {
    const teachers = await this.teachersRepository.findAll();

    return {
      teachers,
    };
  }
}
