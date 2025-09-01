import express from "express";
import {
  activateUser,
  createUser,
  deleteUserAddress,
  loadUser,
  loginUser,
  logoutUser,
  updateAddresses,
  updateAvatar,
  updateUser,
  updateUserPassword,
} from "../controllers/UserController.js";
import upload from "../multer.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/create-user", upload.single("file"), createUser);
userRouter.post("/activation", activateUser);
userRouter.post("/login-user", loginUser);
userRouter.get("/get-user", isAuthenticated, loadUser);
userRouter.get("/logout-user", isAuthenticated, logoutUser);
userRouter.put("/update-user-info", isAuthenticated, updateUser);
userRouter.put(
  "/update-user-avatar",
  isAuthenticated,
  upload.single("image"),
  updateAvatar
);
userRouter.put("/update-user-addresses", isAuthenticated, updateAddresses);
userRouter.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  deleteUserAddress
);
userRouter.put("/update-user-password", isAuthenticated, updateUserPassword);

export default userRouter;
