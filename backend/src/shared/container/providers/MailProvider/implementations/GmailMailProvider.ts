import nodemailer, { Transporter } from "nodemailer";
import { inject, injectable } from "tsyringe";

// config
import mailConfig from "@config/mail";

// dtos
import { ISendMailDTO } from "@shared/container/providers/MailProvider/dtos/ISendMailDTO";

// models
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import { IMailTemplateProvider } from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
export class GmailMailProvider implements IMailProvider {
  private client?: Transporter;

  constructor(
    // @ts-ignore
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "fatec.arthurdeazevedo@gmail.com",
        pass: "Rashaabolasha123",
      },
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await this.client!.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
