import { Request, Response, NextFunction } from "express";
import { responseSuccessMessage } from "../../utils/helpers";
import prisma from "../../prisma/client";

export const index = async (req: Request, res: Response, next: NextFunction) => {

  const posts = await prisma.post.findMany({
    select : {
      id : true,
      title : true,
      content : true,
      published : true,
      author : true, 
      topic : true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return responseSuccessMessage(res, "Post list successfully", posts);
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  const { title, content, published, authorId, topicId } = req.body;
  console.log(req.body);
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
