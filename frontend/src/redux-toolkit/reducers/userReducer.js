import { createReducer } from "@reduxjs/toolkit";
import { clearErrors, loadUser } from "../actions/userActions";
const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(loadUser.pending, state => {
      state.loading = true;
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, state => {
      state.error = null;
    });
});
