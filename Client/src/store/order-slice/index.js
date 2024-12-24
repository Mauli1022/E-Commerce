import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    approvalURL : null,
    isLoading : false,
    orderId : null,
}

// Async Thunk
export const createNewOrder = createAsyncThunk("/order/createNewOrder", 
    async(orderData)=>{
    const response = await axios.post('http://localhost:8000/api/order/create-product',orderData)
    return response.data
})

const shoppingOrderSlice = createSlice({
    name : 'shoppingOrderSlice',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(createNewOrder.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createNewOrder.fulfilled,(state,action)=>{
            console.log("Add Case",action.payload.approvalURL)
            
            state.isLoading = false,
            state.approvalURL = action.payload.approvalURL,
            state.orderId = action.payload.orderId
        })
        .addCase(createNewOrder.rejected,(state,action)=>{
            state.isLoading = false,
            state.approvalURL = null ,
            state.orderId = null
        })
    }

})

export default shoppingOrderSlice.reducer