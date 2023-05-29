import Joi from "joi";

export const postSchema = Joi.object({
    image: Joi.string().required(),
    description: Joi.string().required()
})