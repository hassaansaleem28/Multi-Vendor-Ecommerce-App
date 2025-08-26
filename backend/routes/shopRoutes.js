import express from "express";
import {
  activateSeller,
  createShop,
  getShopInfo,
  loadSeller,
  loginSeller,
  logoutSeller,
} from "../controllers/shopController.js";
import upload from "../multer.js";
import { isSeller } from "../middleware/auth.js";

const shopRouter = express.Router();

shopRouter.post("/create-seller", upload.single("file"), createShop);
shopRouter.post("/seller-account/activation", activateSeller);
shopRouter.post("/login-seller", loginSeller);
shopRouter.get("/getSeller", isSeller, loadSeller);
shopRouter.get("/logout-seller", logoutSeller);
shopRouter.get("/get-shop-info/:id", getShopInfo);

export default shopRouter;
