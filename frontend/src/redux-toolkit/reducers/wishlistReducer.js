import { createReducer } from "@reduxjs/toolkit";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../actions/wishlistActions";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishListReducer = createReducer(initialState, builder => {
  builder
    .addCase(addToWishlistAction, (state, action) => {
      const item = action.payload;
      const isItemExist = state?.wishlist?.find(ite => ite?._id === item?._id);
      if (isItemExist)
        return {
          ...state,
          wishlist: state.wishlist.map(i =>
            i._id === isItemExist._id ? item : i
          ),
        };
      else {
        return {
          ...state,
          wishlist: [...state.wishlist, item],
        };
      }
    })
    .addCase(removeFromWishlistAction, (state, action) => {
      return {
        ...state,
        wishlist: state.wishlist.filter(i => i._id !== action.payload),
      };
    });
});
