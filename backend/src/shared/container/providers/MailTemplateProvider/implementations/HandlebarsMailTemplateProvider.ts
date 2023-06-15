import handlebars from "handlebars";
import fs from "node:fs";

// dtos
import { IParseTemplateDTO } from "@shared/container/providers/MailTemplateProvider/dtos/IParseTemplateDTO";

// models
import { IMailTemplateProvider } from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
