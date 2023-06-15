import { inject, injectable } from "tsyringe";
import sendGrid from "@sendgrid/mail";

// config
import mailConfig from "@config/mail";

// dtos
import { ISendMailDTO } from "@shared/container/providers/MailProvider/dtos/ISendMailDTO";

// models
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import { IMailTemplateProvider } from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
export class SendGridMailProvider implements IMailProvider {
  constructor(
    // @ts-ignore
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    sendGrid.setApiKey(mailConfig.sendGrid.apiKey);
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await sendGrid.send({
      from: {
        name: from?.name || name,
        email: from?.email || email,
      },
      to: {
        name: to.name || "Pessoa",
        email: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
