import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js"
import productSliceReducer from "./Admin/Product-Slice/productSlice.js";
import shopProductSliceReducer from "./Shop/shoppingProductSlice.js"
import shoppingCartSliceReducer from "./cart-slice/index.js"
import addressSliceReducer from "./address-slice/index.js"
import shoppingOrderSliceReducer from "./order-slice/index.js"
import adminOrderSliceReducer from "./Admin/Orders-Slice/adminOrdersSlice.js"
import searchProductSliceReducer from "./search-slice/searchSlice.js"
import productReviewSliceReducer from "./review-slice/productReviewSlice.js"

export const store = configureStore({
    reducer: {
        auth : authReducer,
        adminProduct : productSliceReducer,
        shopProduct : shopProductSliceReducer,
        shoppingCart : shoppingCartSliceReducer,
        address : addressSliceReducer,
        shoppingOrder : shoppingOrderSliceReducer,
        adminOrder : adminOrderSliceReducer,
        searchProduct : searchProductSliceReducer,
        producrReview : productReviewSliceReducer
    },
  })