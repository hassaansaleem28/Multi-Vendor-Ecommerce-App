import { createReducer } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/userActions";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsAdmin,
  getAllProductsShop,
} from "../actions/productActions";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, builder => {
  builder
    // create a product
    .addCase(createProduct.pending, state => {
      state.isLoading = true;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.product = action.payload;
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })
    // get all the products for specific shop
    .addCase(getAllProductsShop.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllProductsShop.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    })
    .addCase(getAllProductsShop.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // delete the product
    .addCase(deleteProduct.pending, state => {
      state.isLoading = true;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getAllProducts.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getAllProductsAdmin.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllProductsAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allProductsAdmin = action.payload;
    })
    .addCase(getAllProductsAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, state => {
      state.error = null;
    });
});
