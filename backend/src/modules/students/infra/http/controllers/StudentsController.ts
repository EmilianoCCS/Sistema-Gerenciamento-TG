import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { CreateStudentService } from "@modules/students/services/CreateStudentService";

export class StudentsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const {
      fullName,
      displayName,
      email,
      secondaryEmail,
      schoolId,
      courseId,
      disciplineIds,
      phone,
      isWhatsapp,
      isPhoneVisible,
    } = request.body;

    const createStudent = container.resolve(CreateStudentService);

    const { student } = await createStudent.execute({
      fullName,
      displayName,
      email,
      secondaryEmail,
      schoolId,
      courseId,
      disciplineIds,
      phone,
      isWhatsapp,
      isPhoneVisible,
    });

    return response.status(201).json({
      student: instanceToPlain(student),
    });
  }
}
