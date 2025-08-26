import express from "express";
import {
  createCounponCode,
  deleteCoupon,
  getAllCoupons,
} from "../controllers/couponController.js";
import { isSeller } from "../middleware/auth.js";

const couponRouter = express.Router();

couponRouter.post("/create-coupon-code", createCounponCode);
couponRouter.get("/get-coupon/:id", isSeller, getAllCoupons);
couponRouter.delete("/delete-coupon/:id", isSeller, deleteCoupon);

export default couponRouter;
