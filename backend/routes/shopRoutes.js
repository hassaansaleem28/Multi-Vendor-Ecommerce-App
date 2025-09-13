import express from "express";
import {
  activateSeller,
  createShop,
  deleteSellerFromAdmin,
  deleteWithdrawMethod,
  getAllSellers,
  getShopInfo,
  loadSeller,
  loginSeller,
  logoutSeller,
  updateShopAvatar,
  updateShopProfile,
  updateWithdrawMethods,
} from "../controllers/shopController.js";
import upload from "../multer.js";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";

const shopRouter = express.Router();

shopRouter.post("/create-seller", upload.single("file"), createShop);
shopRouter.post("/seller-account/activation", activateSeller);
shopRouter.post("/login-seller", loginSeller);
shopRouter.get("/getSeller", isSeller, loadSeller);
shopRouter.get("/logout-seller", logoutSeller);
shopRouter.get("/get-shop-info/:id", getShopInfo);
shopRouter.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  updateShopAvatar
);
shopRouter.put("/update-shop-profile", isSeller, updateShopProfile);
shopRouter.get(
  "/get-all-sellers-admin",
  isAuthenticated,
  isAdmin("Admin"),
  getAllSellers
);
shopRouter.delete(
  "/delete-seller-from-admin/:id",
  isAuthenticated,
  isAdmin("Admin"),
  deleteSellerFromAdmin
);
shopRouter.put("/update-withdraw-method", isSeller, updateWithdrawMethods);
shopRouter.delete("/delete-withdraw-method", isSeller, deleteWithdrawMethod);

export default shopRouter;
