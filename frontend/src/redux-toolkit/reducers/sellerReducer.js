import { createReducer } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/userActions";
import { getAllSellers, loadSeller } from "../actions/sellerActions";

const initialState = {
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, builder => {
  builder
    .addCase(loadSeller.pending, state => {
      state.isLoading = true;
    })
    .addCase(loadSeller.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSeller = true;
      state.seller = action.payload;
    })
    .addCase(loadSeller.rejected, (state, action) => {
      state.isLoading = false;
      state.isSeller = false;
      state.error = action.payload;
    })
    .addCase(getAllSellers.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllSellers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase(getAllSellers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, state => {
      state.error = null;
    });
});
