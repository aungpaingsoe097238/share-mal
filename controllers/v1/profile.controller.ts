import { Request, Response, NextFunction } from "express";
import {
  responseSuccessMessage,
  responseErrorMessage,
} from "../../utils/helpers";
import prisma from "../../prisma/client";

/**
 * Retrieves the profile details of the currently authenticated user.
 *
 * @param req Request object
 * @param res Response object
 * @param next NextFunction object
 * @returns A response with the profile details of the authenticated user
 */
export const me = async (req: any, res: Response, next: NextFunction) => {
  const me = await prisma.user.findUnique({
    where: { id: req.user.id },
  });
  return responseSuccessMessage(res, "Profile detail successfully", me);
};

/**
 * Updates the profile details of the currently authenticated user.
 *
 * @param req Request object
 * @param res Response object
 * @param next NextFunction object
 * @returns A response with the updated profile details of the authenticated user
 */
export const update = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.user;
  const { bio, dob, phone, image } = req.body;

  const profileData: any = {};

  if (bio) {
    profileData.bio = bio;
  }

  if (dob) {
    profileData.dob = dob;
  }

  if (phone) {
    profileData.phone = phone;
  }

  if (image) {
    profileData.image = {
      connect: { id: image },
    };
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      profile: {
        update: profileData,
      },
    },
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

  return responseSuccessMessage(res, "Profile updated successfully", user);
};
