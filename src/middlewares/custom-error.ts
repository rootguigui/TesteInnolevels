import CustomError from "../interfaces/custom-error.interface";

import { Request, Response, NextFunction } from "express";

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.log("Error handler: ", error);
  const statusCode = error.statusCode ?? 500;
  const message = error.message ?? "Internal server error";
  const errors = error.errors ?? [];

  res.status(statusCode).json({
    statusCode,
    message,
    errors,
  });
};

export default errorHandler;
