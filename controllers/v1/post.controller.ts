import { Request, Response, NextFunction } from "express";
import { responseSuccessMessage } from "../../utils/helpers";

export const index = (req: Request, res: Response, next: NextFunction) => {
  return responseSuccessMessage(res, "Post list successfully", []);
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  return responseSuccessMessage(res, "Post list successfully", []);
};

export const show = (req: Request, res: Response, next: NextFunction) => {
  return responseSuccessMessage(res, "Post list successfully", []);
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  return responseSuccessMessage(res, "Post list successfully", []);
};

export const destroy = (req: Request, res: Response, next: NextFunction) => {
  return responseSuccessMessage(res, "Post list successfully", []);
};
