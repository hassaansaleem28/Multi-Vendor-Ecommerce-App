import express from "express";
import {
  activateUser,
  createUser,
  loadUser,
  loginUser,
  logoutUser,
} from "../controllers/UserController.js";
import upload from "../multer.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/create-user", upload.single("file"), createUser);
userRouter.post("/activation", activateUser);
userRouter.post("/login-user", loginUser);
userRouter.get("/get-user", isAuthenticated, loadUser);
userRouter.get("/logout-user", isAuthenticated, logoutUser);

export default userRouter;
