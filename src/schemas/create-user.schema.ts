import Joi from "joi";

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

export { createUserSchema };
