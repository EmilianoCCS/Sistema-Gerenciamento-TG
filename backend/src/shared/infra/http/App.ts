import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { booleanize } from "express-query-booleanizer";

// import swaggerUi from 'swagger-ui-express';

// import swaggerFile from "@docs/swagger.json";

import { AppError } from "@shared/errors/AppError";
import { routes } from "@shared/infra/http/routes";
import { dataSource } from "@shared/infra/typeorm";

class App {
  public server: express.Application;
  private port: number;

  constructor(appInit: { port: number }) {
    this.server = express();
    this.port = appInit.port;

    this.middlewares();
    this.routes();
    this.database();
    this.errors();

    this.assets();
    this.docs();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(booleanize());
  }

  private routes(): void {
    this.server.use(routes);
  }

  private async database(): Promise<void> {
    await dataSource.initialize();
  }

  private errors(): void {
    this.server.use(
      (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
          return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
          });
        }

        console.error(error);

        return response.status(500).json({
          status: "error",
          message: "Internal server error",
        });
      },
    );
  }

  private assets(): void {
    this.server.use("/files", express.static("tmp/uploads"));
    // this.server.use("/views", express.static('views'));
  }

  private docs(): void {
    // this.server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  public start(): void {
    this.server.listen(this.port, () => {
      console.log(`🚀 Server listening on the http://localhost:${this.port}`);
      console.log("CTRL + C to stop server");
    });
  }
}

export { App };
