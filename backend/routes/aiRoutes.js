import express from "express";
import { productSearchAssistant } from "../controllers/aiController.js";
import { aiRateLimit } from "../middleware/aiRateLimit.js";

const aiRouter = express.Router();

aiRouter.post("/product-search", aiRateLimit, productSearchAssistant);

export default aiRouter;
