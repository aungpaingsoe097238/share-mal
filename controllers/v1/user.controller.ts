import prisma from "../../prisma/client";
import {
  responseSuccessMessage,
  responseErrorMessage,
} from "../../utils/helpers";
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
      id: "desc",
    },
  });

  return responseSuccessMessage(res, "User list successfully", users);
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      posts: true,
      profile: true
    },
  });

  if (!existingUser) {
    return responseErrorMessage(
      res,
      "Failed to retrieve user",
      {
        post: "User not found",
      },
      404
    );
  }

  return responseSuccessMessage(
    res,
    "User retrieved successfully",
    existingUser
  );
};
