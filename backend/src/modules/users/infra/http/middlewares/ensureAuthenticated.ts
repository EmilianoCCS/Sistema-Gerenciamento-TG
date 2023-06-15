import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

// config
import authConfig from "@config/auth";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// errors
import { AppError } from "@shared/errors/AppError";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(MessagesHelper.JWT_TOKEN_MISSING, 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.secretToken);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError(MessagesHelper.JWT_TOKEN_INVALID, 401);
  }
}
