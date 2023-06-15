import multer, { StorageEngine } from "multer";
import crypto from "node:crypto";
import path from "node:path";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

interface IUploadConfig {
  driver: "s3" | "disk";
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, "uploads"),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, cb) {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;

        return cb(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: "sgtg",
    },
  },
} as IUploadConfig;
