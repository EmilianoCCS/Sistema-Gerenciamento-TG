import { container } from "tsyringe";

// configs
import uploadConfig from "@config/upload";

// implementations
import { DiskStorageProvider } from "@shared/container/providers/StorageProvider/implementations/DiskStorageProvider";
import { S3StorageProvider } from "@shared/container/providers/StorageProvider/implementations/S3StorageProvider";

// models
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  providers[uploadConfig.driver],
);
