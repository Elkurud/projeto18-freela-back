import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    image: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})