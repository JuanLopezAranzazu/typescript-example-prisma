import { Request, Response, NextFunction } from "express";

function logErrors(
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  console.log("logErrors");
  console.error(err);
  next(err);
}

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log("errorHandler");
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

export { logErrors, errorHandler };
