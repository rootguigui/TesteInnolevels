import Joi from "joi";

const authVerifySchema = Joi.object({
  auth: Joi.string().required(),
});

export { authVerifySchema };
