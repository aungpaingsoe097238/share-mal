import { Request, Response, NextFunction } from "express";
import {
  responseSuccessMessage,
  responseErrorMessage,
  generateUniqueSlug,
} from "../../utils/helpers";
import { validateTopic } from "../../utils/post";
import prisma from "../../prisma/client";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const posts = await prisma.post.findMany({
    where: {
      published: "PUBLISHED",
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
      topics: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return responseSuccessMessage(res, "Post list successfully", posts);
};

export const create = async (req: any, res: Response, next: NextFunction) => {
  const { title, content, published, topics } = req.body;

  const postSlug = await generateUniqueSlug(title);

  const existingTopics: any = await validateTopic(res, topics);

  const post = await prisma.post.create({
    data: {
      slug: postSlug,
      title,
      content,
      published,
      authorId: req.user.id,
      topics: {
        create: existingTopics,
      },
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
      topics: {
        select: {
          topic: true,
        },
      },
    },
  });

  return responseSuccessMessage(res, "Post create successfully", post);
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;

  const existingPost = await prisma.post.findUnique({
    where: { slug, published: "PUBLISHED" },
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
      topics: true,
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
  const { title, content, published, topics } = req.body;

  const existingPost = await prisma.post.findUnique({
    where: { slug },
    include: {
      topics: {
        select: {
          id: true,
        },
      },
    },
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

  const topicIds = existingPost.topics.map((topic) => topic.id).join(", ");
  const existingTopics: any = await validateTopic(res, topics || topicIds);

  const post = await prisma.post.update({
    where: { slug },
    data: {
      title: title || existingPost.title,
      content: content || existingPost.content,
      published: published || existingPost.published,
      topics: {
        deleteMany: {},
        create: existingTopics,
      },
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
      topics: {
        select: {
          topic: true,
        },
      },
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
