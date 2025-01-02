import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allProduct : [],
    isLoading : false,
    productDetails : null
}

export const fetchAllShoppingProducts = createAsyncThunk(
    "/products/fetchAllShoppingProducts",
    async ({filterParams, sortParams}) => {

        const query = new URLSearchParams({
            ...filterParams,
            sortBy : sortParams
        })

        const result = await axios.get(`http://localhost:8000/api/shop/get-all-product?${query}`)

        return result.data
})


export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
        const result = await axios.get(`http://localhost:8000/api/shop/get-Product-details/${id}`)
        // console.log(result);
        
        return result.data
})


    // Slice to fetch All Shopping product for shopping view
export const shoppingProductSlice = createSlice({
    name : "shoppingProducts",
    initialState,
    reducers : {
        setProductDetails : (state,action)=>{
            state.productDetails = null
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllShoppingProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllShoppingProducts.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.isLoading = false,
            state.allProduct = action.payload.data
        })
        .addCase(fetchAllShoppingProducts.rejected,(state,action)=>{
            // console.log(action);
            state.isLoading = false,
            state.allProduct = []
        })
        .addCase(fetchProductDetails.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.isLoading = false,
            state.productDetails = action.payload.data
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            console.log(action);
            state.isLoading = false,
            state.productDetails = null
        })
    }

})
export const { setProductDetails } = shoppingProductSlice.actions
export default shoppingProductSlice.reducer;