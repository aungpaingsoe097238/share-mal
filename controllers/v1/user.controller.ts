import prisma from "../../prisma/client";
import {
  responseSuccessMessage,
  responseErrorMessage,
} from "../../utils/helpers";
import { Request, Response, NextFunction } from "express";

/**
 * Retrieves the list of users.
 *
 * @param req Request object
 * @param res Response object
 * @param next NextFunction object
 * @returns A response with the list of users
 */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Retrieve the list of users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      posts: true,
      profile: {
        include: {
          image: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  // Respond with success message and the list of users
  return responseSuccessMessage(res, "User list successfully", users);
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  // Retrieve the id from the request parameters
  const { id } = req.params;

  // Find the existing user by the provided id
  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      posts: true,
      profile: {
        include: {
          image: true,
        },
      },
    },
  });

  // If the user does not exist, return an error message
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

  // Respond with success message and the existing user
  return responseSuccessMessage(
    res,
    "User retrieved successfully",
    existingUser
  );
};
