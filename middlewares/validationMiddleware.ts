import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { responseErrorMessage } from "../utils/helpers";

/**
 * Middleware for handling errors and validating request bodies using Joi schema.
 * @param fun - The function to execute after request body validation.
 * @param schema - The Joi schema to validate the request body against.
 * @returns Express middleware function.
 */
const validationMiddleware = (schema?: Joi.Schema, message?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schema) {
      const { error }: any = schema.validate(req.body);
      if (error) {

        const errorObject = {
          [error.details[0].path]: error.details[0].message,
        };
        
        return responseErrorMessage(
          res,
          message ? message : "Validation failed",
          errorObject,
          400
        );
      }
    }

    next();
  };
};

export default validationMiddleware;
