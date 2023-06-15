export interface ICreateUserTokenDTO {
  userId: string;
  expiresDate: Date;
  token: string;
  tokenType: string;
}
