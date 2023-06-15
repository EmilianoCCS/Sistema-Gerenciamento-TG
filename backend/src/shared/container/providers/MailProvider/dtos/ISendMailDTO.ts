import { IParseTemplateDTO } from "@shared/container/providers/MailTemplateProvider/dtos/IParseTemplateDTO";

interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseTemplateDTO;
}
