import express from "express";
import {
  getStripeApiKey,
  processStripePayment,
} from "../controllers/stripeController.js";

const stripeRouter = express.Router();

stripeRouter.post("/payment/process", processStripePayment);
stripeRouter.get("/stripeapikey", getStripeApiKey);

export default stripeRouter;
