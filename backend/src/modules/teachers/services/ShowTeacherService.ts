import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";

// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";

interface IRequest {
  id: string;
}

interface IResponse {
  teacher: TeacherEntity;
}

@injectable()
export class ShowTeacherService {
  constructor(
    // @ts-ignore
    @inject("TeachersRepository")
    private readonly teachersRepository: ITeachersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const findTeacher = await this.teachersRepository.findById(id);

    if (!findTeacher) {
      throw new AppError(MessagesHelper.TEACHER_NOT_FOUND, 404);
    }

    return {
      teacher: findTeacher,
    };
  }
}
