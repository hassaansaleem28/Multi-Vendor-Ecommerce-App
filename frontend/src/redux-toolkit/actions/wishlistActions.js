import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const addToWishlistAction = createAction("addToWishlist");
export const removeFromWishlistAction = createAction("removeFromWishlist");

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlistThunk",
  async (item, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(addToWishlistAction(item));
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(getState().wishlist.wishlist)
      );
      return item;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to wishList!"
      );
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlistThunk",
  async (item, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(removeFromWishlistAction(item._id));
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(getState().wishlist.wishlist)
      );
      return item;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item from wishlist!"
      );
    }
  }
);
