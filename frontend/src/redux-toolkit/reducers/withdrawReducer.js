import { createReducer } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/userActions";
import { getAllWithdraws } from "../actions/withdrawActions";

const initialState = {
  isLoading: true,
};

export const withdrawReducer = createReducer(initialState, builder => {
  builder
    .addCase(getAllWithdraws.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllWithdraws.fulfilled, (state, action) => {
      state.isLoading = false;
      state.withdraws = action.payload;
    })
    .addCase(getAllWithdraws.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, state => {
      state.error = null;
    });
});
