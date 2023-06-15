import { container } from "tsyringe";
import mailConfig from "@config/mail";

// models
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";

// implementations
import { EtherealMailProvider } from "@shared/container/providers/MailProvider/implementations/EtherealMailProvider";
import { SESMailProvider } from "@shared/container/providers/MailProvider/implementations/SESMailProvider";
import { GmailMailProvider } from "@shared/container/providers/MailProvider/implementations/GmailMailProvider";
import { SendGridMailProvider } from "@shared/container/providers/MailProvider/implementations/SendGridMailProvider";

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
  gmail: container.resolve(GmailMailProvider),
  sendGrid: container.resolve(SendGridMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  providers[mailConfig.driver],
);
