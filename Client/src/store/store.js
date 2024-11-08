import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js"
import productSliceReducer from "./Admin/Product-Slice/productSlice.js";
import shopProductSliceReducer from "./Shop/shoppingProductSlice.js"
import shoppingCartSliceReducer from "./cart-slice/index.js"
import addressSliceReducer from "./address-slice/index.js"

export const store = configureStore({
    reducer: {
        auth : authReducer,
        adminProduct : productSliceReducer,
        shopProduct : shopProductSliceReducer,
        shoppingCart : shoppingCartSliceReducer,
        address : addressSliceReducer
    },
  })