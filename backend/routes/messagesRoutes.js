import express from "express";
import {
  createNewMessage,
  getAllMessagesId,
} from "../controllers/messagesController.js";
import upload from "../multer.js";

const messagesRouter = express.Router();

messagesRouter.post(
  "/create-new-message",
  upload.array("images"),
  createNewMessage
);
messagesRouter.get("/get-all-messages/:id", getAllMessagesId);

export default messagesRouter;
