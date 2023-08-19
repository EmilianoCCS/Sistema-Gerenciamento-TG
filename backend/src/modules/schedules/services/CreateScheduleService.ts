import { injectable, inject } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ISchedulesRepository } from "@modules/schedules/repositories/ISchedulesRepository";
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { IGroupsRepository } from "@modules/groups/repositories/IGroupsRepository";

// entities
import { ScheduleEntity } from "@modules/schedules/infra/typeorm/entities/ScheduleEntity";
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";

interface IRequest {
  date: Date;
  hour: string;
  group_id: string;
  examinerIds: string[];
}

interface IResponse {
  schedule: ScheduleEntity;
}

@injectable()
export class CreateScheduleService {
  constructor(
    // @ts-ignore
    @inject("SchedulesRepository")
    private readonly schedulesRepository: ISchedulesRepository,

    // @ts-ignore
    @inject("GroupsRepository")
    private readonly groupsRepository: IGroupsRepository,

    // @ts-ignore
    @inject("TeachersRepository")
    private readonly teachersRepository: ITeachersRepository,
  ) {}

  public async execute({
    date,
    hour,
    group_id,
    examinerIds,
  }: IRequest): Promise<IResponse> {
    const findGroup = await this.groupsRepository.findById(group_id);

    if (!findGroup) {
      throw new AppError(MessagesHelper.GROUP_NOT_FOUND, 404);
    }

    const examiners: TeacherEntity[] = [];

    if (examinerIds && examinerIds.length > 1) {
      for (const examinerId of examinerIds) {
        const findExaminer = await this.teachersRepository.findById(examinerId);

        if (!findExaminer) {
          throw new AppError(MessagesHelper.TEACHER_NOT_FOUND, 404);
        }

        examiners.push(findExaminer);
      }
    }

    const schedule = await this.schedulesRepository.create({
      date,
      hour,
      group: findGroup,
      examiners,
    });

    return {
      schedule,
    };
  }
}
