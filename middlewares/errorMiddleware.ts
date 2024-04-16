import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { responseErrorMessage } from "../utils/helpers";

/**
 * Middleware for handling errors and validating request bodies using Joi schema.
 * @param fun - The function to execute after request body validation.
 * @param schema - The Joi schema to validate the request body against.
 * @returns Express middleware function.
 */
const errorMiddleware = (fun: Function, schema?: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fun(req, res, next);
    } catch (error) {
      console.error("Error:", error);
      return responseErrorMessage(res, "Internal Server Errord", error, 500);
    }
  };
};

export default errorMiddleware;
