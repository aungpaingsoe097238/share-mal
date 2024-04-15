import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const validator = (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: Joi.Schema
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success : false,  
      message : error.details[0].message,
    });
  } else {
    return next();
  }
};
