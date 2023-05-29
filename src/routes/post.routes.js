import { Router } from "express";
import { tokenValidate } from "../middlewares/validateToken.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";
import { addPost, getPost, getPostById } from "../controllers/post.controller.js";

const postRouter = Router()

postRouter.post("/post", validateSchema(postSchema), tokenValidate, addPost)
postRouter.get("/post", getPost)
postRouter.get("/post/:id", getPostById)
postRouter.delete("/urls/:id", tokenValidate, )

export default postRouter