import express from "express";
import {
  createWithdrawRequest,
  getAllWithdraws,
  updateWithdrawStatus,
} from "../controllers/withdrawController.js";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";

const withdrawRouter = express.Router();

withdrawRouter.post(
  "/create-withdraw-request",
  isSeller,
  createWithdrawRequest
);
withdrawRouter.get(
  "/get-all-withdraw-requests",
  isAuthenticated,
  isAdmin("Admin"),
  getAllWithdraws
);
withdrawRouter.put(
  "/update-withdraw-status/:id",
  isAuthenticated,
  isAdmin("Admin"),
  updateWithdrawStatus
);

export default withdrawRouter;
