import { createReducer } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/userActions";
import { getAllOrdersShop, getAllOrdersUser } from "../actions/orderActions";

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
    .addCase(clearErrors, state => {
      state.error = null;
    });
});
