import { Router } from "express";
import { tokenValidate } from "../middlewares/validateToken.middleware.js";
import { followUser, listFollowers, findUserByName } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/user/follow/:id", tokenValidate, followUser)
userRouter.get("/user/follow", tokenValidate, listFollowers)
userRouter.get("/user/search", findUserByName)

export default userRouter