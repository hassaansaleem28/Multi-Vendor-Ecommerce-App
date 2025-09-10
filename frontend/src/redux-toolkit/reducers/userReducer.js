import { createReducer } from "@reduxjs/toolkit";
import {
  clearErrors,
  deleteAddress,
  getAllUsers,
  loadUser,
  updateAddresses,
  updateUser,
} from "../actions/userActions";
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
    // update user info
    .addCase(updateUser.pending, state => {
      state.loading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateAddresses.pending, state => {
      state.addressloading = true;
    })
    .addCase(updateAddresses.fulfilled, (state, action) => {
      state.addressloading = false;
      state.user = action.payload;
    })
    .addCase(updateAddresses.rejected, (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    .addCase(deleteAddress.pending, state => {
      state.deletingAddress = true;
    })
    .addCase(deleteAddress.fulfilled, (state, action) => {
      state.deletingAddress = false;
      state.user = action.payload;
    })
    .addCase(deleteAddress.rejected, (state, action) => {
      state.deletingAddress = false;
      state.error = action.payload;
    })
    .addCase(getAllUsers.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, state => {
      state.error = null;
    });
});
