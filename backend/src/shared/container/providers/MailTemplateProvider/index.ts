import { container } from "tsyringe";

// models
import { IMailTemplateProvider } from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

// implementations
import { HandlebarsMailTemplateProvider } from "@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  providers.handlebars,
);
