import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsShop,
} from "../controllers/productController.js";
import upload from "../multer.js";
import { isSeller } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.post("/create-product", upload.array("images"), createProduct);
productRouter.get("/get-all-products-shop/:id", getAllProductsShop);
productRouter.delete("/delete-shop-product/:id", isSeller, deleteProduct);
productRouter.get("/get-all-products", getAllProducts);

export default productRouter;
