import express from "express";
import connectDB from "./db/mongodb.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./routes/UserRoutes.js";
import cors from "cors";
import shopRouter from "./routes/shopRoutes.js";
import productRouter from "./routes/productRoutes.js";
import eventsRouter from "./routes/eventRoutes.js";
import couponRouter from "./routes/couponRoutes.js";
import stripeRouter from "./routes/stripeRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import conversationRouter from "./routes/conversationRoutes.js";
import messagesRouter from "./routes/messagesRoutes.js";
import withdrawRouter from "./routes/withdrawRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "./uploads")));
connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/v2/user", userRouter);
app.use("/api/v2/seller", shopRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/events", eventsRouter);
app.use("/api/v2/coupons", couponRouter);
app.use("/api/v2/payment", stripeRouter);
app.use("/api/v2/order", orderRouter);
app.use("/api/v2/conversation", conversationRouter);
app.use("/api/v2/messages", messagesRouter);
app.use("/api/v2/withdraw-request", withdrawRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}...`);
});
