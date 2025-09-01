import { createReducer } from "@reduxjs/toolkit";
import { addToCartAction, removeFromCartAction } from "../actions/cartActions";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, builder => {
  builder
    .addCase(addToCartAction, (state, action) => {
      const item = action.payload;
      const isItemExist = state?.cart?.find(ite => ite?._id === item?._id);
      if (isItemExist)
        return {
          ...state,
          cart: state.cart.map(i => (i._id === isItemExist._id ? item : i)),
        };
      else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    })
    .addCase(removeFromCartAction, (state, action) => {
      return {
        ...state,
        cart: state.cart.filter(i => i._id !== action.payload),
      };
    });
});
