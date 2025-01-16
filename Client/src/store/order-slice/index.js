import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    approvalURL : null,
    isLoading : false,
    orderId : null,
    orderList : [],
    orderDetails : null

}

// Async Thunk
export const createNewOrder = createAsyncThunk("/order/createNewOrder", 
    async(orderData)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/create-product`,orderData)
    return response.data
})

export const captureOrder = createAsyncThunk("/order/captureOrder", 
    async({ paymentId, payerId, orderId })=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/capture-payment`,
    { 
        paymentId,
        payerId,
        orderId
    })
    return response.data;
})

// async thunk to fetch all Order of users
export const getAllUsersOrder = createAsyncThunk("/order/getAllOrderByUser",
    async(userId)=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/all-users-order/${userId}`);

        return response.data;
})

// async thunk to fetch single Order Details
export const getSingleOrderDetails = createAsyncThunk("/order/getSingleOrderDetails",
    async(id)=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/single-order-details/${id}`);
        return response.data;
})



const shoppingOrderSlice = createSlice({
    name : 'shoppingOrderSlice',
    initialState,
    reducers : {
        resetOrderDetails : (state)=>{
            state.orderDetails = null
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(createNewOrder.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createNewOrder.fulfilled,(state,action)=>{
            // console.log("Add Case",action.payload.approvalURL)
            
            state.isLoading = false,
            state.approvalURL = action.payload.approvalURL,
            state.orderId = action.payload.orderId

            sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
        })
        .addCase(createNewOrder.rejected,(state,action)=>{
            state.isLoading = false,
            state.approvalURL = null ,
            state.orderId = null
        })
        .addCase(getAllUsersOrder.pending, (state)=>{
            state.isLoading = true
            
        })
        .addCase(getAllUsersOrder.fulfilled, (state, action)=>{
            // console.log(action.payload.data);
            
            state.isLoading = false
            state.orderList = action.payload.data
        })
        .addCase(getAllUsersOrder.rejected, (state, action)=>{
            state.isLoading = false
            state.orderList = null
        })
        .addCase(getSingleOrderDetails.pending, (state)=>{
            state.isLoading = true
            
        })
        .addCase(getSingleOrderDetails.fulfilled, (state, action)=>{
            // console.log('Async Thunk Index File : ' , action.payload.data);
            
            state.isLoading = false
            state.orderDetails = action.payload.data
        })
        .addCase(getSingleOrderDetails.rejected, (state, action)=>{
            state.isLoading = false
            state.orderDetails = action.payload.data
           
        })
    }

})

export const { resetOrderDetails} = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer