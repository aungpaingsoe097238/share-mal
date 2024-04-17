import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  content: Joi.string(),
  published: Joi.boolean().required().messages({
    "any.required": "Published status is requried",
  }),
  authorId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "any.required": "Author is requried",
      "string.pattern.base": "AuthorId must be a valid MongoDB ObjectId",
    }),
  topicId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "any.required": "Topic is requried",
      "string.pattern.base": "TopicId must be a valid MongoDB ObjectId",
    }),
});

export const updatePostSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  published: Joi.boolean(),
  authorId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "any.required": "Author is requried",
      "string.pattern.base": "AuthorId must be a valid MongoDB ObjectId",
    }),
  topicId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "any.required": "Author is requried",
      "string.pattern.base": "TopicId must be a valid MongoDB ObjectId",
    }),
});
