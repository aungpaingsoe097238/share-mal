import Joi from "joi";

export const updateProfileSchema = Joi.object({
  bio: Joi.string(),
  dob: Joi.string(),
  phone: Joi.number(),
  image: Joi.string()
    .empty("")
    .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
    .messages({
      "string.pattern.base": "Image must be a valid MongoDB ObjectId",
      "string.empty": "Image field must not be empty",
    }),
});
