import express from "express";
import {
  createProduct,
  createReviewForProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsAdmin,
  getAllProductsShop,
} from "../controllers/productController.js";
import upload from "../multer.js";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.post("/create-product", upload.array("images"), createProduct);
productRouter.get("/get-all-products-shop/:id", getAllProductsShop);
productRouter.delete("/delete-shop-product/:id", isSeller, deleteProduct);
productRouter.get("/get-all-products", getAllProducts);
productRouter.put(
  "/create-new-review",
  isAuthenticated,
  createReviewForProduct
);
productRouter.get(
  "/get-all-products-admin",
  isAuthenticated,
  isAdmin("Admin"),
  getAllProductsAdmin
);
export default productRouter;
