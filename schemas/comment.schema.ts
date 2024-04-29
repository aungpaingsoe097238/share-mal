import Joi from "joi";

export const createCommentSchema = Joi.object({
  content: Joi.string().required().messages({
    "any.required": "Content is required",
    "string.empty": "Content is required",
    "string.base": "Content must be a string"
  }),
  postId: Joi.string().required().messages({
    "any.required": "Post id is required",
    "string.empty": "Post id is required",
    "string.base": "Post id must be a string",
  }),
});

export const updateCommentSchema = Joi.object({
  content: Joi.string().messages({
    "string.empty": "Content is required",
    "string.base": "Content must be a string"
  }),
  postId: Joi.string().messages({
    "string.empty": "Post id is required",
    "string.base": "Post id must be a string",
  }),
});
