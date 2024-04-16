import Joi from "joi";

export const updateSchema = Joi.object({
  bio: Joi.string(),
  dob: Joi.string(),
  phone: Joi.number(),
  image: Joi.string(),
});
