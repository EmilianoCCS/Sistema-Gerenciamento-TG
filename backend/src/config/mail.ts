interface IMailConfig {
  driver: "ethereal" | "ses" | "gmail" | "sendGrid";

  sendGrid: {
    apiKey: string;
  };

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_PROVIDER || "ethereal",

  sendGrid: {
    apiKey: process.env.SEND_GRID_API_SECRET,
  },

  defaults: {
    from: {
      name: "Equipe Sistema Gerenciamento de Trabalhos de Graduação",
      email: "fatec.arthurdeazevedo@gmail.com",
    },
  },
} as IMailConfig;
