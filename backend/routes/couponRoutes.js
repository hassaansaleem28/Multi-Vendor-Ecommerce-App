import express from "express";
import {
  createCounponCode,
  deleteCoupon,
  getAllCoupons,
  getCouponValue,
} from "../controllers/couponController.js";
import { isAuthenticated, isSeller } from "../middleware/auth.js";

const couponRouter = express.Router();

couponRouter.post("/create-coupon-code", createCounponCode);
couponRouter.get("/get-coupon/:id", isSeller, getAllCoupons);
couponRouter.get("/get-coupon-value/:name", getCouponValue);
couponRouter.delete("/delete-coupon/:id", isSeller, deleteCoupon);

export default couponRouter;
