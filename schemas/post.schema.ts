import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  content: Joi.string(),
  published: Joi.string()
    .valid("PUBLISHED", "NOT_PUBLISHED")
    .required()
    .messages({
      "any.required": "Published status is requried",
      "any.only": "Published status is must be PUBLISHED or NOT_PUBLISHED",
    }),
  topicId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "any.required": "Topic is requried",
      "string.empty": "Topic is required",
      "string.pattern.base": "TopicId must be a valid MongoDB ObjectId",
    }),
});

export const updatePostSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  published: Joi.string().valid("PUBLISHED", "NOT_PUBLISHED").messages({
    "any.only": "Published status is must be PUBLISHED or NOT_PUBLISHED",
  }),
  topicId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "any.required": "Author is requried",
      "string.pattern.base": "TopicId must be a valid MongoDB ObjectId",
    }),
});
