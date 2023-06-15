export interface ICoursesDisciplinesRepository {
  create(courseId: string, disciplineIds: string[]): Promise<void>;
  deleteByDisciplineIds(disciplineIds: string[]): Promise<void>;
}
