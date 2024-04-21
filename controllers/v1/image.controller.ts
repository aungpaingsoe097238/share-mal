import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";
import {
  responseErrorMessage,
  responseSuccessMessage,
} from "../../utils/helpers";
import * as fs from "fs";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const images = await prisma.image.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      url: true,
    },
  });
  return responseSuccessMessage(res, "Image list successfully", images);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "File is required" });
  }

  const files: any = req.files.file;
  const filename = new Date().valueOf() + "_" + files.name;
  const filePath = `./public/uploads/${filename}`;

  // Create directory if it doesn't exist
  if (!fs.existsSync(`./public/uploads`)) {
    fs.mkdirSync(`./public/uploads`, { recursive: true });
  }

  files.mv(filePath);
  const fileUrl = `${req.protocol}://${req.get(
    "host"
  )}/public/uploads/${filename}`;

  const image = await prisma.image.create({
    data: {
      url: fileUrl,
    },
  });

  return responseSuccessMessage(res, "Image create successfully", image);
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const image = await prisma.image.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!image) {
    return responseErrorMessage(
      res,
      "Failed to fetch image",
      {
        image: "Image not found",
      },
      404
    );
  }

  return responseSuccessMessage(res, "Image detail successfully", image);
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return;
  // fs.unlinkSync(`./public/uploads/${req.body.filename}`);
};
