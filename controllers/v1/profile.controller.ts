import { Request, Response, NextFunction } from "express";
import {
  responseSuccessMessage,
} from "../../utils/helpers";
import prisma from "../../prisma/client";

export const me = async (req: any, res: Response, next: NextFunction) => {
  const me = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id : true,
      name : true,
      username : true,
      email : true, 
      role : true,
      createdAt : true
    }
  });
  return responseSuccessMessage(res, "Profile detail successfully", me);
};


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
    profileData.image = image;
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
      posts: true,
      profile: true,
      createdAt: true,
    },
  });

  return responseSuccessMessage(res, "Profile updated successfully", user);
};
