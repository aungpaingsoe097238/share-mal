import { Request, Response, NextFunction } from "express";
import {
  responseSuccessMessage,
  responseErrorMessage,
} from "../../utils/helpers";
import prisma from "../../prisma/client";

/**
 * Retrieves the list of categories.
 *
 * @param req Request object
 * @param res Response object
 * @param next NextFunction object
 * @returns A response with the list of categories
 */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const topics = await prisma.topic.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      parentId: true,
      children: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return responseSuccessMessage(res, "Category list successfully", topics);
};
