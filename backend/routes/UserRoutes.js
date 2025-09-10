import express from "express";
import {
  activateUser,
  createUser,
  deleteUserAddress,
  deleteUserFromAdmin,
  getAllUsers,
  getUser4Id,
  loadUser,
  loginUser,
  logoutUser,
  updateAddresses,
  updateAvatar,
  updateUser,
  updateUserPassword,
} from "../controllers/UserController.js";
import upload from "../multer.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

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
userRouter.get("/get-user-4id/:id", getUser4Id);
userRouter.get(
  "/get-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  getAllUsers
);
userRouter.delete(
  "/delete-user-from-admin/:id",
  isAuthenticated,
  isAdmin("Admin"),
  deleteUserFromAdmin
);

export default userRouter;
