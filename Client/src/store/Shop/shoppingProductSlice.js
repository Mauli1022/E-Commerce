import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allProduct : [],
    isLoading : false
}

export const fetchAllShoppingProducts = createAsyncThunk(
    "/products/fetchAllShoppingProducts",
    async () => {
        const result = await axios.get("http://localhost:8000/api/shop/get-all-product")
        // console.log(result);
        return result.data
})


    // Slice to fetch All Shopping product for shopping view
export const shoppingProductSlice = createSlice({
    name : "shoppingProducts",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchAllShoppingProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllShoppingProducts.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.isLoading = false,
            state.allProduct = action.payload.data
        })
        .addCase(fetchAllShoppingProducts.rejected,(state,action)=>{
            console.log(action);
            state.isLoading = false,
            state.allProduct = []
        })
    }

})

export default shoppingProductSlice.reducer;