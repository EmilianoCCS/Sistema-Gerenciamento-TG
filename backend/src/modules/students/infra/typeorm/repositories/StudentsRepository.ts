import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateStudentDTO } from "@modules/students/dtos/ICreateStudentDTO";

// repositories
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";

// entities
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";

export class StudentsRepository implements IStudentsRepository {
  private repository: Repository<StudentEntity>;

  constructor() {
    this.repository = dataSource.getRepository(StudentEntity);
  }

  public async create({
    user,
    school,
    course,
    disciplines,
  }: ICreateStudentDTO): Promise<StudentEntity> {
    const student = this.repository.create({
      user,
      school,
      course,
      disciplines,
    });

    await this.repository.save(student);

    return student;
  }

  public async findByUserId(id: string): Promise<StudentEntity | null> {
    const student = await this.repository.findOne({
      where: {
        userId: id,
      },
      relations: [
        "user",
        "school",
        "course",
        "disciplines",
        "groupStudentInvites",
        "groupStudentInvites.student",
        "groupStudentInvites.group",
        "groups",
      ],
    });

    return student;
  }

  public async findByEmail(email: string): Promise<StudentEntity | null> {
    const student = await this.repository.findOne({
      where: {
        user: {
          email,
        },
      },
      relations: [
        "school",
        "course",
        "disciplines",
        "groupStudentInvites",
        "groups",
        "user",
      ],
    });

    return student;
  }

  public async update(student: StudentEntity): Promise<StudentEntity> {
    return this.repository.save(student);
  }
}
