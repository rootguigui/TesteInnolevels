import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        message: detail.message,
        fields: detail.path.join("."),
      }));

      res.status(400).json({ 
        status: "error",
        message: "Validation error",
        errors,
      });
    }

    req.body = value;

    next();
  };
};

export { validateRequest };
