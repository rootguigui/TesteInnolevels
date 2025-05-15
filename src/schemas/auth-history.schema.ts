import Joi from "joi";

const authHistorySchema = Joi.object({
  email: Joi.string().email().required(),
});

export { authHistorySchema };
