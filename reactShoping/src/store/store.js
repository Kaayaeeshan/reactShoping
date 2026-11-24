import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./carSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});
