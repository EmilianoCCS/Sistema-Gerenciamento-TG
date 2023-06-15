interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
