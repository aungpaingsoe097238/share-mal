import prisma from "../../prisma/client";
import { responseSuccessMessage } from "../../utils/helpers";
import { Request, Response, NextFunction } from "express";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      posts: true,
      profile: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return responseSuccessMessage(res, "User list successfully", users);
};

