import { Request, Response, NextFunction } from "express";
import {
  responseSuccessMessage,
  responseErrorMessage,
  generateUniqueSlug,
} from "../../utils/helpers";
import { accessOnlyChildTopic } from "../../utils/post";
import prisma from "../../prisma/client";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          createdAt: true,
        },
      },
      topic: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return responseSuccessMessage(res, "Post list successfully", posts);
};

export const create = async (req: any, res: Response, next: NextFunction) => {
  const { title, content, published, topicId } = req.body;
  const postSlug = await generateUniqueSlug(title); // Await the promise

  const existingTopic = await accessOnlyChildTopic(res, topicId);

  if (!existingTopic) {
    return responseErrorMessage(
      res,
      "Failed to create post",
      {
        topicId: "Topic not found",
      },
      404
    );
  }

  const post = await prisma.post.create({
    data: {
      slug: postSlug,
      title,
      content,
      published,
      authorId: req.user.id,
      topicId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          createdAt: true,
        },
      },
      topic: true,
    },
  });

  return responseSuccessMessage(res, "Post create successfully", post);
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;

  const existingPost = await prisma.post.findUnique({
    where: { slug },
  });

  if (!existingPost) {
    return responseErrorMessage(
      res,
      "Failed to find post",
      {
        post: "Post not found",
      },
      404
    );
  }

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          createdAt: true,
        },
      },
      topic: true,
    },
  });

  return responseSuccessMessage(res, "Post detail successfully", post);
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { slug } = req.params;
  const { title, content, published, topicId } = req.body;

  const existingPost = await prisma.post.findUnique({
    where: { slug },
  });

  if (!existingPost) {
    return responseErrorMessage(
      res,
      "Failed to update post",
      {
        post: "Post not found",
      },
      404
    );
  }

  const existingTopic = await accessOnlyChildTopic(res, topicId);

  if (!existingTopic) {
    return responseErrorMessage(
      res,
      "Failed to update post",
      {
        topicId: "Topic not found",
      },
      404
    );
  }

  const post = await prisma.post.update({
    where: { slug },
    data: {
      title: title || existingPost.title,
      content: content || existingPost.content,
      published: published || existingPost.published,
      topicId: topicId || existingPost.topicId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          createdAt: true,
        },
      },
      topic: true,
    },
  });

  return responseSuccessMessage(res, "Post update successfully", post);
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { slug } = req.params;

  const existingPost = await prisma.post.findUnique({
    where: { slug },
  });

  if (!existingPost) {
    return responseErrorMessage(
      res,
      "Failed to destroy post",
      {
        post: "Post not found",
      },
      404
    );
  }

  await prisma.post.delete({
    where: { slug },
  });

  return responseSuccessMessage(res, "Post delete successfully", {});
};
