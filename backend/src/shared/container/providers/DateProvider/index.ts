import { container } from "tsyringe";

// implementations
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

// models
import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider,
);
