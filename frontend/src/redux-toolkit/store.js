import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { sellerReducer } from "./reducers/sellerReducer";
import { productReducer } from "./reducers/productReducer";
import { eventReducer } from "./reducers/eventReducer";
import { cartReducer } from "./reducers/cartReducer";
import { wishListReducer } from "./reducers/wishlistReducer";
import { orderReducer } from "./reducers/orderReducer";
import { withdrawReducer } from "./reducers/withdrawReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
    orders: orderReducer,
    withdraw: withdrawReducer,
  },
});
export default store;
