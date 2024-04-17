import { Request, Response, NextFunction } from "express";
import { responseSuccessMessage } from "../../utils/helpers";
import prisma from "../../prisma/client";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const topics = await prisma.topic.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return responseSuccessMessage(res, "Category list successfully", topics);
};
