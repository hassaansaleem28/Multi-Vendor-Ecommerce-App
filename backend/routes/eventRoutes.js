import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getAllEventsAdmin,
  getAllEventsShop,
} from "../controllers/eventController.js";
import upload from "../multer.js";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";

const eventsRouter = express.Router();

eventsRouter.post("/create-event", upload.array("images"), createEvent);
eventsRouter.get("/get-all-events-shop/:id", getAllEventsShop);
eventsRouter.delete("/delete-shop-event/:id", isSeller, deleteEvent);
eventsRouter.get("/get-all-events", getAllEvents);
eventsRouter.get(
  "/get-all-events-admin",
  isAuthenticated,
  isAdmin("Admin"),
  getAllEventsAdmin
);

export default eventsRouter;
