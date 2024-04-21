import Joi from "joi";

export const createImage = Joi.object({
  dir_path: Joi.string(),
  file: Joi.string()
    .empty("")
    .pattern(new RegExp(/\.(jpg|jpeg|png)$/))
    .messages({
      "string.pattern.base": "File must be a valid image (JPEG, PNG)",
      "string.empty": "File field must not be empty",
    }),
});
