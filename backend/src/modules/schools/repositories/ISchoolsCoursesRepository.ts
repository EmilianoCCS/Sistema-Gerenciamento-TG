export interface ISchoolsCoursesRepository {
  create(schoolId: string, courseIds: string[]): Promise<void>;
  deleteByCourseIds(courseIds: string[]): Promise<void>;
}
