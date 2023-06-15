import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListCoursesService } from "@modules/courses/services/ListCoursesService";
import { CreateCourseService } from "@modules/courses/services/CreateCourseService";
import { ShowCourseService } from "@modules/courses/services/ShowCourseService";
import { UpdateCourseService } from "@modules/courses/services/UpdateCourseService";
import { DeleteCourseService } from "@modules/courses/services/DeleteCourseService";

export class CoursesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListCoursesService);

    const { courses } = await listCourses.execute();

    return response.status(200).json({
      courses: instanceToPlain(courses),
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, disciplineIds } = request.body;

    const createCourse = container.resolve(CreateCourseService);

    const { course } = await createCourse.execute({
      name,
      disciplineIds,
    });

    return response.status(201).json({
      course: instanceToPlain(course),
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCourse = container.resolve(ShowCourseService);

    const { course } = await showCourse.execute({ id });

    return response.status(200).json({
      course: instanceToPlain(course),
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, disciplineIds } = request.body;

    const updateCourse = container.resolve(UpdateCourseService);

    const { course } = await updateCourse.execute({
      id,
      name,
      disciplineIds,
    });

    return response.status(200).json({
      course: instanceToPlain(course),
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCourse = container.resolve(DeleteCourseService);

    await deleteCourse.execute({ id });

    return response.status(204).end();
  }
}
