import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  content: Joi.string().required().messages({
    "any.required": "Content is required",
  }),
  coverImage: Joi.string().required().messages({
    "any.required": "Cover image is required",
  }),
  published: Joi.string()
    .valid("PUBLISHED", "NOT_PUBLISHED")
    .required()
    .messages({
      "any.required": "Published status is requried",
      "any.only": "Published status is must be PUBLISHED or NOT_PUBLISHED",
    }),
  topics: Joi.array()
    .items(
      Joi.string().empty("").pattern(new RegExp("^[0-9a-fA-F]{24}$")).required()
    )
    .required()
    .unique()
    .messages({
      "any.required": "Topics are required",
      "array.empty": "Topics are required",
      "string.empty": "Topic is required",
      "string.pattern.base": "TopicId must be a valid MongoDB ObjectId",
      "array.unique": "Topics must be unique",
    }),
});

export const updatePostSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  coverImage: Joi.string(),
  published: Joi.string().valid("PUBLISHED", "NOT_PUBLISHED").messages({
    "any.only": "Published status is must be PUBLISHED or NOT_PUBLISHED",
  }),
  topics: Joi.array()
    .items(
      Joi.string().empty("").pattern(new RegExp("^[0-9a-fA-F]{24}$")).required()
    )
    .unique()
    .messages({
      "any.required": "Topics are required",
      "array.empty": "Topics are required",
      "string.empty": "Topic is required",
      "string.pattern.base": "TopicId must be a valid MongoDB ObjectId",
      "array.unique": "Topics must be unique",
    }),
});
