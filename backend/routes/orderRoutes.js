import express from "express";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";
import {
  acceptOrderRefund,
  createOrder,
  getAllOrders,
  getAllOrdersAdmin,
  getAllOrderShop,
  giveOrderRefund,
  updateOrderStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);
orderRouter.get("/get-all-orders/:userId", getAllOrders);
orderRouter.get("/get-all-seller-orders/:shopId", getAllOrderShop);
orderRouter.put("/update-order-status/:id", isSeller, updateOrderStatus);
orderRouter.put("/give-order-refund/:id", giveOrderRefund);
orderRouter.put("/order-refund-success/:id", isSeller, acceptOrderRefund);
orderRouter.get(
  "/get-all-orders-admin",
  isAuthenticated,
  isAdmin("Admin"),
  getAllOrdersAdmin
);

export default orderRouter;
