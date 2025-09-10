import { createReducer } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/userActions";
import {
  getAllOrdersAdmin,
  getAllOrdersShop,
  getAllOrdersUser,
} from "../actions/orderActions";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, builder => {
  builder
    // get all the orders of users
    .addCase(getAllOrdersUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllOrdersUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase(getAllOrdersUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // get all orders of shop
    .addCase(getAllOrdersShop.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllOrdersShop.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shopOrders = action.payload;
    })
    .addCase(getAllOrdersShop.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // get all orders of admin
    .addCase(getAllOrdersAdmin.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase(getAllOrdersAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, state => {
      state.error = null;
    });
});
