import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    reviews : []
}

export const createReview = createAsyncThunk("/shop/createReviews",
    async(data)=>{ 
        const response = await axios.post("http://localhost:8000/api/product-review/create-route",data)
        return response.data
})

export const fetchReview = createAsyncThunk("/shop/fetchReview",
    async(productId)=>{
        // console.log("productId:",productId);
        
        const response = await axios.get(`http://localhost:8000/api/product-review/get-review/${productId}`)
        return response.data
})

const productReviewSlice = createSlice({
    name : "productReviewSlice",
    initialState,
    reducers: {},
    extraReducers : (builder) =>{
        builder
        .addCase(fetchReview.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchReview.fulfilled, (state, action)=>{
            // console.log(action.payload.data);
            
            state.isLoading = false
            state.reviews = action.payload.data
        })
        .addCase(fetchReview.rejected, (state, action)=>{
            state.isLoading = false
            state.reviews = []
        })

    } 
})


export default productReviewSlice.reducer