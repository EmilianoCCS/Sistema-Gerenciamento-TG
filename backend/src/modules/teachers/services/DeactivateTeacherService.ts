import { injectable, inject } from "tsyringe";

// repositories
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";

// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";
import { AppError } from "@shared/errors/AppError";
import { MessagesHelper } from "@helpers/MessagesHelper";

interface IRequest {
  id: string;
}

interface IResponse {
  teacher: TeacherEntity;
}

@injectable()
export class DeactivateTeacherService {
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

    findTeacher.isActivated = false;

    const updatedTeacher = await this.teachersRepository.update(findTeacher);

    return {
      teacher: updatedTeacher,
    };
  }
}
