import Joi from "joi";

export const updateProfileSchema = Joi.object({
  bio: Joi.string(),
  dob: Joi.string(),
  phone: Joi.number(),
  image: Joi.string().empty("").messages({
    "string.empty": "Image field must not be empty",
  }),
});
