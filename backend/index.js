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

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the E-Shop!");
});

app.use("/api/v2/user", userRouter);
app.use("/api/v2/seller", shopRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/events", eventsRouter);
app.use("/api/v2/coupons", couponRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}...`);
});
