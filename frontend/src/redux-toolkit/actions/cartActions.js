import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCartAction = createAction("addToCart");
export const removeFromCartAction = createAction("removeFromCart");

export const addToCart = createAsyncThunk(
  "cart/addToCartThunk",
  async (item, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(addToCartAction(item));
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
      return item;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart!"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCartThunk",
  async (item, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(removeFromCartAction(item._id));
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
      return item;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item from cart!"
      );
    }
  }
);
