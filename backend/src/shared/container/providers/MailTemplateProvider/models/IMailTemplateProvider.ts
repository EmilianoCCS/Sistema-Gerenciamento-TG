import { IParseTemplateDTO } from "@shared/container/providers/MailTemplateProvider/dtos/IParseTemplateDTO";

export interface IMailTemplateProvider {
  parse(data: IParseTemplateDTO): Promise<string>;
}
