import express from "express";
import {
  createNewConversation,
  getAllSellerConversations,
  getAllUserConversations,
  updateLastMessage,
} from "../controllers/conversationController.js";
import { isAuthenticated, isSeller } from "../middleware/auth.js";

const conversationRouter = express.Router();

conversationRouter.post("/create-new-conversation", createNewConversation);
conversationRouter.get(
  "/get-all-seller-conversations/:id",
  isSeller,
  getAllSellerConversations
);
conversationRouter.put("/update-last-message/:id", updateLastMessage);
conversationRouter.get(
  "/get-all-user-conversations/:id",
  isAuthenticated,
  getAllUserConversations
);

export default conversationRouter;
