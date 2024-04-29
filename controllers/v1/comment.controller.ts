import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";
import {
  responseErrorMessage,
  responseSuccessMessage,
} from "../../utils/helpers";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: {
        select: {
          id : true,
          username : true,
          name : true,
          email : true,
          role: true
        } 
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return responseSuccessMessage(res, "Comment list successfully", comments);
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const existingComment = await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id : true,
          username : true,
          name : true,
          email : true,
          role: true
        } 
      },
      post: true,
    },
  });

  if (!existingComment) {
    return responseErrorMessage(
      res,
      "Failed to find comment",
      { comment: "Comment not found" },
      404
    );
  }

  return responseSuccessMessage(
    res,
    "Comment detail successfully",
    existingComment
  );
};

export const create = async (req: any, res: Response, next: NextFunction) => {
  const { postId, content } = req.body;

  const existingPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if(!existingPost){
    return responseErrorMessage(res, "Failed to create comment", { post: "Post not found" }, 404);
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      user: {
        connect: { id: req.user.id },
      },
      post: {
        connect: { id: postId },
      },
    },
    include: {
      user: {
        select: {
          id : true,
          username : true,
          name : true,
          email : true,
          role: true
        } 
      },
      post: true,
    },
  });

  return responseSuccessMessage(res, "Comment created successfully", comment);
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content } = req.body;
  const { id } = req.params;

  const existingComment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });

  if (!existingComment) {
    return responseErrorMessage(
      res,
      "Failed to find comment",
      { comment: "Comment not found" },
      404
    );
  }

  const updatedComment = await prisma.comment.update({
    where: {
      id,
    },
    data: {
      content: content || existingComment.content,
    },
    include: {
      user: {
        select: {
          id : true,
          username : true,
          name : true,
          email : true,
          role: true
        } 
      },
      post: true,
    },
  });

  return responseSuccessMessage(
    res,
    "Comment updated successfully",
    updatedComment
  );
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const existingComment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });

  if (!existingComment) {
    return responseErrorMessage(
      res,
      "Failed to find comment",
      { comment: "Comment not found" },
      404
    );
  }

  await prisma.comment.delete({
    where: {
      id,
    },
  });

  return responseSuccessMessage(res, "Comment deleted successfully", {});
};
