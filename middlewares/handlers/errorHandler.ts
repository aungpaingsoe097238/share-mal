import { Request, Response, NextFunction } from "express";
import Joi from "joi";

/**
 * A middleware function that validates the request body using Joi schema and handles errors.
 *
 * @param {Function} handler - The function to be executed after the request body is validated.
 * @param {Joi.Schema} schema - The Joi schema to validate the request body.
 *
 * @returns {Function} A new middleware function that validates the request body and handles errors.
 */
const errorHandler = (handler: Function, schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.details[0].message,
        });
      }

      await handler(req, res, next);
    } catch (error) {
      console.error("Error:", error);

      return res.status(400).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};

export default errorHandler;
