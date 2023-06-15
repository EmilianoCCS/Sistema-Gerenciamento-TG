// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { SchoolEntity } from "@modules/schools/infra/typeorm/entities/SchoolEntity";

export interface ICreateCoordinatorDTO {
  user: UserEntity;
  school: SchoolEntity;
}
