import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js"
import productSliceReducer from "./Admin/Product-Slice/productSlice.js";

export const store = configureStore({
    reducer: {
        auth : authReducer,
        adminProduct : productSliceReducer
    },
  })