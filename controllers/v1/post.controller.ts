import { Request, Response, NextFunction } from "express";
import {
  responseSuccessMessage,
  responseErrorMessage,
  generateUniqueSlug,
} from "../../utils/helpers";
import { validateTopic } from "../../utils/post";
import prisma from "../../prisma/client";

/**
 * Fetches the list of published posts.
 *
 * @param req Request object
 * @param res Response object
 * @param next NextFunction object
 * @returns A response with a list of published posts
 */
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

/**
 * Creates a new post.
 *
 * @param req Request object
 * @param res Response object
 * @param next NextFunction object
 * @returns A response with the newly created post
 */
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

  return responseSuccessMessage(res, "Post created successfully", post);
};

/**
 * Retrieves the details of a specific post.
 *
 * @param req Request object
 * @param res Response object
 * @param next NextFunction object
 * @returns A response with the details of the requested post
 */
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

/**
 * Updates an existing post.
 *
 * @param req Request object
 * @param res Response object
 * @param next NextFunction object
 * @returns A response with the updated post
 */
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

  const topicIds = existingPost.topics.map((topic: any) => topic.id).join(", ");

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

/**
 * Deletes an existing post.
 *
 * @param req Request object
 * @param res Response object
 * @param next NextFunction object
 * @returns A response indicating the success of the post deletion
 */
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
